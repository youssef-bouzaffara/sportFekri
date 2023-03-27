import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {

  matches : any = [];
  age : number = 90 ;

  constructor(
    private router : Router,
    private matchService : MatchService
    ) { }

  ngOnInit() {

    // this.matches = JSON.parse(localStorage.getItem("matches") || "[]");

    this.matchService.getAllMatches().subscribe(
      (response)=>{
        this.matches=response.matches;

      }
    );


  }

  displayMatch(x: number){

    this.router.navigate([`matchInfo/${x}`])

  }

  editMatch(id: number){

    this.router.navigate([`editMatch/${id}`]);

  }

  deleteMatch(id: number){

    // for (let i = 0; i < this.matches.length; i++) {
      
    //   if (id == this.matches[i].id) {

    //     this.matches.splice(i,1);
    //     break;
        
    //   }
      
    // }

    // localStorage.setItem("matches",JSON.stringify(this.matches));

    this.matchService.deleteMatchById(id).subscribe(
      (response)=>{
        console.log("Here response after delete :",response.msg);
        this.matchService.getAllMatches().subscribe(
          (data)=>{
            this.matches=data.matches;
          }
        );
      }
    );

    

  }

}
