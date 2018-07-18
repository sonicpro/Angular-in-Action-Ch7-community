import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsComponent } from './blogs/blogs.component';
import { BlogComponent } from './blog/blog.component';

import { BlogsService } from './services/blogs.service';
import { BlogsRoutingModule } from "./blogs-routing.module";

// Lazy loaded module that is loaded when the user navigates to "blogs".
// Unlike AppModule or ForumsModule, routes are not in the constant variable, but in the "routing module".
@NgModule({
  imports: [
    CommonModule,
    BlogsRoutingModule
  ],
  declarations: [
    BlogsComponent,
    BlogComponent,
  ],
  providers: [
    BlogsService
  ]
})
export class BlogsModule { }
