import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ForumsService } from '../services/forums.service';
import { Forum, Thread } from '../services/data';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  thread: Thread;

  constructor(private forumsService: ForumsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>
      {
        // Unlike the threads component's route this component route is not empty, hence does not share parameters with the parent route.
        // Use snapshot.parent syntax to get the parent route information.
        const forum = this.route.snapshot.parent.params["forum_alias"];
        this.thread = this.forumsService.thread(forum, params["thread_alias"]);
      });
  }
}
