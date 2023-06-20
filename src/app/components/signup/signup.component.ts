import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // Form Id
  signupForm: FormGroup;
  imagePreview: string;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      img: [""]
    })
  }

  signup() {
    console.log("Here object", this.signupForm.value);
    this.userService.signup(this.signupForm.value, this.signupForm.value.img).subscribe();
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("Here selected file", file);
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }

}
