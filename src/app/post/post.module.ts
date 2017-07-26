import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule
  ],
  declarations: [PostListComponent, PostDetailsComponent, CreatePostComponent, UpdatePostComponent]
})
export class PostModule { }
