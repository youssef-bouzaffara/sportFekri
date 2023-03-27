import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {

  player: any = {};

  id: any ;

  constructor(
    private activatedRoute : ActivatedRoute,
    private playerService : PlayerService
    ) { }

  ngOnInit() {



     // Get ID value from actif path
     this.id = this.activatedRoute.snapshot.paramMap.get("id");


    // get all match from BE

    this.playerService.getPlayerById(this.id).subscribe(
      (response)=>{
        this.player=response.player;
        
      }
    );

  }

}
