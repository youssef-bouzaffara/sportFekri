import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {

  editMatchForm = FormGroup

  match: any = {};

  matches: any = [];

  id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matchService: MatchService
  ) { }

  ngOnInit() {

    // Get id from path
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.matchService.getMatchById(this.id).subscribe(
      (response)=>{
        this.match=response.match;
      }
    );



  }

  editMatch() {


    // Unlogic code but it works !!!!!!! how ??? 
    // localStorage.setItem("matches",JSON.stringify(this.matches));

    // for (let i = 0; i < this.matches.length; i++) {
    //   if (this.matches[i].id == this.id) {
    //     this.matches[i] = this.match;
    //     break;

    //   }

    // }

    // localStorage.setItem("matches", JSON.stringify(this.matches));

    this.matchService.editMatch(this.match).subscribe(
      (response)=>{
        console.log("Here message :",response.msg);
        this.router.navigate(["admin"]);
      }
    );
    


  }

}
