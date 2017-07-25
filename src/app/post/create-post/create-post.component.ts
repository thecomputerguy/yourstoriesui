import {Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef} from "@angular/core";
import {FormControlName, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Post} from "../model/Post";
import {Subscription, Observable} from "rxjs";
import {GenericValidator} from "../../shared/generic-validator";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentService} from "../../comment/services/CommentService";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle: string = 'Post Edit';
  errorMessage: string;
  postForm: FormGroup;

  post: Post;
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
              private postService: CommentService) {

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
    this.postForm = this.fb.group({
      id: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      title: [false, Validators.required],
      article: ['', Validators.required],
      titleClean: ['', Validators.required],
      datePublished: ['',Validators.required],
      bannerImage: [],
      featured: [],
      enabled:[],
      commentsEnabled:[],
      views: [],
      categories: [],
      relatedPosts: [],
      tags: []
    });

    // Read the product Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        let id = params['id'];
        this.getPost(id);
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
    Observable.merge(this.postForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.postForm);
    });
  }

  /*addTag(): void {
   this.tags.push(new FormControl());
   }
   */
  getPost(id: string): void {
    this.postService.getPost(id)
      .subscribe(
        (post: Post) => this.onPostRetrieved(post),
        (error: any) => this.errorMessage = <any>error
      );
  }

  onPostRetrieved(post: Post): void {
    if (this.postForm) {
      this.postForm.reset();
    }
    this.post = post;

    if (!this.post.id) {
      this.pageTitle = 'Add Post';
    } else {
      this.pageTitle = `Edit Post: ${this.post.title}`;
    }

    // Update the data on the form
    this.postForm.patchValue({
      id: this.post.id,
      title: this.post.title,
      article: this.post.article,
      titleClean: this.post.titleClean,
      datePublished: this.post.datePublished,
      bannerImage: this.post.bannerImage,
      featured: this.post.featured,
      enabled: this.post.enabled,
      commentsEnabled: this.post.commentsEnabled,
      views: this.post.views,
      categories: this.post.categories,
      relatedPosts: this.post.relatedPosts,

    });
    this.postForm.setControl('tags', this.fb.array(this.post.tags || []));
  }

  deletePost(): void {
    if (!this.post.id) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the Post: ${this.post.title}?`)) {
        this.postService.deletePost(this.post.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  savePost(): void {
    if (this.postForm.dirty && this.postForm.valid) {
      // Copy the form values over the product object values
      let p = Object.assign({}, this.post, this.postForm.value);

      this.postService.savePost(p)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    } else if (!this.postForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.postForm.reset();
    this.router.navigate(['/post']);
  }
}
