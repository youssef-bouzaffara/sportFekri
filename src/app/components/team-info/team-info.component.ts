import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {

  team : any = {};

  id : any; 

  constructor(
    private teamService : TeamService,
    private activatedRoute : ActivatedRoute
    ) { }

  ngOnInit() {

    this.id= this.activatedRoute.snapshot.paramMap.get("id");

    this.teamService.getTeamById(this.id).subscribe(
      (resp)=>{
        this.team= resp.team ;
      }
    )
  }

}
