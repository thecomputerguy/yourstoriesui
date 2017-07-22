import {Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, ElementRef} from "@angular/core";
import {FormControlName, FormGroup, FormArray, FormBuilder, Validators, FormControl} from "@angular/forms";
import {Subscription, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {GenericValidator} from "../../shared/generic-validator";
import {Category} from "../model/Category";
import {CategoryService} from "../services/CategoryService";
import {NumberValidators} from "../../shared/number.validator";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})



export class CreateCategoryComponent implements OnInit, AfterViewInit, OnDestroy  {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle: string = 'Category Edit';
  errorMessage: string;
  categoryForm: FormGroup;

  category: Category;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return <FormArray>this.categoryForm.get('tags');
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      name: {
        required: 'Category name is required.',
        minlength: 'Category name must be at least three characters.',
        maxlength: 'Category name cannot exceed 50 characters.'
      },
      enabled: {
        required: 'Category enabled is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      enabled: [false, Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      //tags: this.fb.array([]),
      description: ''
    });

    // Read the product Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getCategory(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.categoryForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.categoryForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  getCategory(id: number): void {
    this.categoryService.getCategory(id)
      .subscribe(
        (category: Category) => this.onCategoryRetrieved(category),
        (error: any) => this.errorMessage = <any>error
      );
  }

  onCategoryRetrieved(category: Category): void {
    if (this.categoryForm) {
      this.categoryForm.reset();
    }
    this.category = category;

    if (!this.category.id) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.category.name}`;
    }

    // Update the data on the form
    this.categoryForm.patchValue({
      name: this.category.name,
      enabled: this.category.enabled,
      //starRating: this.product.starRating,
      description: this.category.description
    });
    //this.categoryForm.setControl('tags', this.fb.array(this.category.tags || []));
  }

  deleteProduct(): void {
    if (!this.category.id) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.category.name}?`)) {
        this.categoryService.deleteCategory(this.category.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveCategory(): void {
    if (this.categoryForm.dirty && this.categoryForm.valid) {
      // Copy the form values over the product object values
      let p = Object.assign({}, this.category, this.categoryForm.value);

      this.categoryService.saveCategory(p)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    } else if (!this.categoryForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.categoryForm.reset();
    this.router.navigate(['/categories']);
  }

}
