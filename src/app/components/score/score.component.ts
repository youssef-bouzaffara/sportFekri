import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  @Input() X:any;
  @Output() newMatches:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  scoreColor(s1,s2){

    if (s1>s2) {

      return "green"
      
    } else if (s1<s2) {

      return "brown"
      
    } else {

      return "blue"

    }
  }

  teamStyle(s1,s2){
    if (s1>s2) {

      return "Win"
      
    } else if (s1<s2) {

      return "Loss"
      
    } else {

      return "Draw"

    }
  }


  deleteMatch (id){

    // Get objs from LS = [{},{},{},{}]

    let matches = JSON.parse(localStorage.getItem("matches") || "[]");
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].id == id) {
        matches.splice(i,1);
        // matches = [{},{},{}]
        this.newMatches.emit(matches);
        break;
      }
      
    }

    localStorage.setItem("matches",JSON.stringify(matches));

  }



}
