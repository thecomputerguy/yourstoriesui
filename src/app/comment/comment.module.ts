import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentDetailsComponent } from './comment-details/comment-details.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { UpdateCommentComponent } from './update-comment/update-comment.component';

@NgModule({
  imports: [
    CommonModule,
    CommentRoutingModule
  ],
  declarations: [CommentListComponent, CommentDetailsComponent, CreateCommentComponent, UpdateCommentComponent]
})
export class CommentModule { }
