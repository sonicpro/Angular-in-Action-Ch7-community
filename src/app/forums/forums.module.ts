import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { RouterModule, Routes } from "@angular/router";

import { ForumComponent } from './forum/forum.component';
import { ForumsComponent } from './forums/forums.component';
import { ThreadComponent } from './thread/thread.component';
import { ThreadsComponent } from './threads/threads.component';

import { ForumsService } from './services/forums.service';

// Feature module. Includes child routes.
const forumRoutes = [
  { path: "forums", component: ForumsComponent },
  { path: "forums/:forum_alias",
    component: ForumComponent,
    // "children" property lists routes relative to the including route's "path" property,
    // i.e. "" corresponds to "/forums/:forum_alias" absolute path, ":thread_alias" to "/forums/:forum_alias/:thread_alias" etc.
    children: [ // The same pattern as in Forums / Forum component routes. Rendered in forum.component.html router-outlet.
      { path: "", component: ThreadsComponent },
      { path: ":thread_alias", component: ThreadComponent }
    ]
  }
]

@NgModule({
  declarations: [
    ForumComponent,
    ForumsComponent,
    ThreadComponent,
    ThreadsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClarityModule.forChild(),
    RouterModule.forChild(forumRoutes)
  ],
  providers: [
    ForumsService
  ]
})
export class ForumsModule { }
