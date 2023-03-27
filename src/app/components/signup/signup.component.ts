import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { generateId } from 'src/app/shared/genericFunctions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  // Id
  signupForm: FormGroup;

  usersTab: any = [];

  path: string;

  msgErr: string;

  imagePreview: any ;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {

    // récupérer le path actif
    this.path = this.router.url;

    // create form Inputs by FormBuilder
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      img: [""]

    })
  }



  // Event

  signup() {

    console.log("Here user object", this.signupForm.value);


    this.signupForm.value.role = (this.path == "/subscription") ? "user" : "admin";

    this.userService.signup(this.signupForm.value, this.signupForm.value.img).subscribe(
      (resp) => {
        console.log("here message from BE :", resp.message);
        if (resp.message == "Error") {
          this.msgErr = "Email Exist !"
        } else {
          this.router.navigate(["signin"]);
        }
      }
    );





  }


  onImageSelected(event: Event) {

    const file = (event.target as HTMLInputElement).files[0];
    console.log("Here file selected :", file);
    
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }

}
