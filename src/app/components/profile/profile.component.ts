import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  userEmail: string;
  userProfile: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: [""],
      lastName: [""],
      email: [""],
      pwd: [""]
    })
    this.userEmail = this.activatedRoute.snapshot.paramMap.get("email");
    this.userService.getUserByEmail(this.userEmail).subscribe(
      (response) => {
        console.log("Here response from BE", response.user);
        this.userProfile = response.user;
      }
    )
  }

  edit() {
    this.userService.editUser(this.userProfile).subscribe(
      (response) => {
        console.log("Here response after update from BE", response.msg);
      }
    )
  }

}
