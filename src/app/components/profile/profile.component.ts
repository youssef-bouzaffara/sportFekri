import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  myProfileForm = FormGroup;
  editProfileForm: FormGroup;

  myProfile: any = {};
  decodedToken: any={};
  id: any;
  token: any;
  errMsg: string;



  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.token = localStorage.getItem("token");
    
    console.log("here token :", this.token);
    
    this.decodedToken =  jwt_decode(this.token);

    console.log("Here is decoded Token",this.decodedToken);
    

    this.id = this.decodedToken.userId;

    this.userService.getProfileById(this.id).subscribe(
      (resp) => {
        if (resp.isFinded) {

          console.log("Here message from BE, The user is finded :", resp.isFinded);
          console.log("Here user finded :", resp.user);

          this.myProfile = resp.user;
        } else {
          console.log("Here message from BE, The user is finded :", resp.isFinded);
        }
      }
    )

    this.editProfileForm = this.formBuilder.group({
      oldPwd: ["", [Validators.required]],
      newPwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]

    })
  }

  updateProfile() {

    this.myProfile.oldPwd = this.editProfileForm.value.oldPwd;
    this.myProfile.newPwd = this.editProfileForm.value.newPwd;

    console.log("Here user object", this.myProfile);
    console.log("Here user object", this.editProfileForm.value);

    this.userService.editProfile(this.myProfile).subscribe(
      (resp) => {
        console.log("Here type message :", resp.typeResp);

        if (resp.typeResp == "3") {
          alert(resp.msg);
          this.router.navigate([""]);
        } else {
          console.log("Here message Error of update :", resp.msg);
        }

      }
    );


  }

}
