import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BlogsComponent } from "./blogs/blogs.component";
import { BlogComponent } from "./blog/blog.component";

const routes: Routes = [
    { path: "", component: BlogsComponent }, // corresponds to "appRoot/blogs", "blogs" segment is added in AppModule routes.
    { path: ":post_id", component: BlogComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)], // unlike forRoot in Primary routes collection.
    exports: [RouterModule],
    providers: []
})
export class BlogsRoutingModule { }
