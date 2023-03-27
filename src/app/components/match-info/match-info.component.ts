import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {

  match: any = {};
  matches : any = [];

  id: any ;

  constructor(
    private activatedRoute : ActivatedRoute,
    private matchService : MatchService
    ) { }

  ngOnInit() {

    // // get all matches from LS

    // this.matches = JSON.parse(localStorage.getItem("matches") || "[]")


     // Get ID value from actif path
     this.id = this.activatedRoute.snapshot.paramMap.get("id");


    // get all match from BE

    this.matchService.getMatchById(this.id).subscribe(
      (response)=>{
        this.match=response.match;
        
      }
    );

  }
  

}
