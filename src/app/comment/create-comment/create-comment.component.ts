import {Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef} from '@angular/core';
import {FormControlName, FormGroup, FormArray, FormBuilder, Validators, FormControl} from "@angular/forms";
import {Comment} from "../model/Comment";
import {Subscription, Observable} from "rxjs";
import {GenericValidator} from "../../shared/generic-validator";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentService} from "../services/CommentService";
import {NumberValidators} from "../../shared/number.validator";

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle: string = 'Comment Edit';
  errorMessage: string;
  commentForm: FormGroup;

  comment: Comment;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  /*get tags(): FormArray {
    return <FormArray>this.categoryForm.get('tags');
  }
*/
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private commentService: CommentService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      comment: {
        required: 'Comment text is required.',
        minlength: 'Comment must be at least three characters.',
        maxlength: 'Comment cannot exceed 50 characters.'
      },
      enabled: {
        required: 'Comment enabled is required.'
      },
      markRead: {
        range: 'Comment markRead is required.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      enabled: [false, Validators.required],
      markRead: ['', Validators.required],
      postId: ['', Validators.required]
    });

    // Read the product Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getComment(id);
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
    Observable.merge(this.commentForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.commentForm);
    });
  }

  /*addTag(): void {
    this.tags.push(new FormControl());
  }
*/
  getComment(id: number): void {
    this.commentService.getComment(id)
      .subscribe(
        (comment: Comment) => this.onCommentRetrieved(comment),
        (error: any) => this.errorMessage = <any>error
      );
  }

  onCategoryRetrieved(comment: Comment): void {
    if (this.commentForm) {
      this.commentForm.reset();
    }
    this.comment = comment;

    if (!this.comment.id) {
      this.pageTitle = 'Add Comment';
    } else {
      this.pageTitle = `Edit Comment: ${this.comment.comment}`;
    }

    // Update the data on the form
    this.commentForm.patchValue({
      comment: this.comment.comment,
      enabled: this.comment.enabled,
      //starRating: this.product.starRating,
      id: this.comment.id,
      markRead: this.comment.markRead,
      createdDate: this.comment.createdDate,
      postId: this.comment.postId
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
