import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './src/app/category/category-list/category-list.component';
import { CategoryDetailsComponent } from './src/app/category/category-details/category-details.component';
import { CreateCategoryComponent } from './src/app/category/create-category/create-category.component';
import { UpdateCategoryComponent } from './src/app/category/update-category/update-category.component';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule
  ],
  declarations: [CategoryListComponent, CategoryDetailsComponent, CreateCategoryComponent, UpdateCategoryComponent]
})
export class CategoryModule { }
