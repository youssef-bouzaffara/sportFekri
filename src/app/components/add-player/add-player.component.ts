import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  // Form Id
  playerForm: FormGroup;

  // initaliser l'objet
  player: any = {};

  constructor(
    private playerService : PlayerService
  ) { }

  ngOnInit() {
  }

  addPlayer() {

    console.log("Here player Object",this.player);

    this.playerService.addPlayer(this.player).subscribe(
      (response)=>{
        console.log("Here message from BE :", response);
        
      }
    );




    

  };

}
