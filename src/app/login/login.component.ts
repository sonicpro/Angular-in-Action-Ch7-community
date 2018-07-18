import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router"
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // UserName and Password are two-way bound to the template, must be public.
  public username: string = '';
  public password: string = '';

  private return: string = '';

  private go() {
    this.router.navigateByUrl(this.return);
  }

  constructor (private router: Router,
    private userService: UserService,
    private route: ActivatedRoute) { }

  // Uses query params collection to get the return URL.
  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) =>
      {
        this.return = params["return"] || "/forums"; // "return" variable is put into query params in AuthGuardService.
        if (!this.userService.isGuest()) {
          this.go();
        }
      });
  }
  // Accepts any password / username.
  public login() {
    if (this.username && this.password) {
      this.userService.login(this.username); // saves the username to the localstorage.
      this.go();
    }
  }
}