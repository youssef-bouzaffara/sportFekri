import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {

  teamsTab: any = [];

  constructor(
    private teamService: TeamService,
    private router: Router) { }

  ngOnInit() {
    this.teamService.getAllTeams().subscribe(
      (resp) => {
        this.teamsTab = resp.teams;
      }
    );
  }

  displayTeam(id: number) {

    this.router.navigate([`teamInfo/${id}`]);

  }

  editTeam(id: number) {

    alert("Edit " + id)

  }

  deleteTeamById(id: number) {

    this.teamService.deleteTeamById(id).subscribe(
      (response)=>{
        console.log("Here response after delete :", response.message);
        this.teamService.getAllTeams().subscribe(
          (resp) => {
            this.teamsTab = resp.teams;
          }
        );
      }
    );


  }

}
