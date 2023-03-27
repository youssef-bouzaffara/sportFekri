import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-all-matches',
  templateUrl: './all-matches.component.html',
  styleUrls: ['./all-matches.component.css']
})
export class AllMatchesComponent implements OnInit {

  matchesTab : any = [];

  

  

  actualDate:any = new Date();
  title: string = "all matches"

  constructor(private matchService : MatchService) { }

  ngOnInit() {
    // this.matchesTab = JSON.parse(localStorage.getItem("matches") || "[]");
    this.matchService.getAllMatches().subscribe(
      (response)=>{
      
        this.matchesTab=response.matches;
        
      }
    );
  }

  updateMatches(objs : any){

    this.matchesTab = objs ;

  }

}
