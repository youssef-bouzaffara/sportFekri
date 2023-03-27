import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {

  players : any = [];

  constructor(
    private playerService : PlayerService,
    private router : Router
    ) { }

  ngOnInit() {
    this.playerService.getAllPlayers().subscribe(
      (response)=>{
        this.players=response.players;
      }
    )
  }


  displayPlayer(id: number){

    this.router.navigate([`playerInfo/${id}`]);

  }

  editPlayer(id: number){

    alert("Edit "+id)

  }

  deletePlayer(id: number){

    alert("Delete "+id)

  }

}
