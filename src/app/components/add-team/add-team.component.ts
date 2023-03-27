import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  // Form Id
  teamForm: FormGroup;

  // initaliser l'objet
  team: any = {};

  constructor(
    private teamService : TeamService,
    private router : Router) { }

  ngOnInit() {
  }

  addTeam(){

    console.log("les données que tu as remplis sont",this.team);
    
    this.teamService.addTeam(this.team).subscribe(
      (response)=>{
        console.log("here response after adding team : ", response.msg);
        this.router.navigate(["admin"]);
      }
    );

  };

}
