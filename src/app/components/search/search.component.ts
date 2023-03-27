import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm : FormGroup;

  objectSearch : any = {};

  matchesFinded : any = [];

  constructor(private matchService : MatchService) { }

  ngOnInit() {
  }

  searchMatches(){
    

    this.matchService.searchMatchesByScores(this.objectSearch).subscribe(
      (response)=>{
        this.matchesFinded=response.matches;
      }
    )

  }

}
