import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagRoutingModule } from './tag-routing.module';
import { TagListComponent } from './src/app/tag/tag-list/tag-list.component';
import { TagDetailsComponent } from './src/app/tag/tag-details/tag-details.component';
import { CreateTagComponent } from './src/app/tag/create-tag/create-tag.component';
import { UpdateTagComponent } from './src/app/tag/update-tag/update-tag.component';

@NgModule({
  imports: [
    CommonModule,
    TagRoutingModule
  ],
  declarations: [TagListComponent, TagDetailsComponent, CreateTagComponent, UpdateTagComponent]
})
export class TagModule { }
