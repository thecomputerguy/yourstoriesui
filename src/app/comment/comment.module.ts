import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { CommentListComponent } from './src/app/comment/comment-list/comment-list.component';
import { CommentDetailsComponent } from './src/app/comment/comment-details/comment-details.component';
import { CreateCommentComponent } from './src/app/comment/create-comment/create-comment.component';
import { UpdateCommentComponent } from './src/app/comment/update-comment/update-comment.component';

@NgModule({
  imports: [
    CommonModule,
    CommentRoutingModule
  ],
  declarations: [CommentListComponent, CommentDetailsComponent, CreateCommentComponent, UpdateCommentComponent]
})
export class CommentModule { }
