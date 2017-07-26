import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule
  ],
  declarations: [CategoryListComponent, CategoryDetailsComponent, CreateCategoryComponent, UpdateCategoryComponent]
})
export class CategoryModule { }
