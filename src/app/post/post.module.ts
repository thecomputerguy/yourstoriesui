import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './src/app/post/post-list/post-list.component';
import { PostDetailsComponent } from './src/app/post/post-details/post-details.component';
import { CreatePostComponent } from './src/app/post/create-post/create-post.component';
import { UpdatePostComponent } from './src/app/post/update-post/update-post.component';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule
  ],
  declarations: [PostListComponent, PostDetailsComponent, CreatePostComponent, UpdatePostComponent]
})
export class PostModule { }
