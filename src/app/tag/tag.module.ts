import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagRoutingModule } from './tag-routing.module';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagDetailsComponent } from './tag-details/tag-details.component';
import { CreateTagComponent } from './create-tag/create-tag.component';
import { UpdateTagComponent } from './update-tag/update-tag.component';

@NgModule({
  imports: [
    CommonModule,
    TagRoutingModule
  ],
  declarations: [TagListComponent, TagDetailsComponent, CreateTagComponent, UpdateTagComponent]
})
export class TagModule { }
