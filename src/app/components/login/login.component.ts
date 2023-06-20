import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //  Form Id
  loginForm: FormGroup;
  users: any;
  errorMsg: string;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required]]
    })
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log("Hereinto login reponse:", response);
        if (response.msg == "2") {
          this.router.navigate([`profile/${response.user.email}`])
        } else {
          this.errorMsg = "Please Check Email/Pwd";
        }
      }
    )
  }
}
