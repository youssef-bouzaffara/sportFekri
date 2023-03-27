import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamUrl: string = "http://localhost:3000/teams";

  constructor(private httpClient: HttpClient) { }

  // Request to add match
  // Response: message
  addTeam(teamObj) {
    return this.httpClient.post<{ msg: string }>(this.teamUrl, teamObj);
  }

  // Request to get All Matches
  // Response : [{}, {}, ....., {}]
  getAllTeams() {

    return this.httpClient.get<{ teams: any, msg: string }>(this.teamUrl);
  }

  // Request to get match by Id
  // Response : {}
  getTeamById(id) {

    return this.httpClient.get<{ team: any, teamFinded: boolean }>(`${this.teamUrl}/${id}`);

  }


  // Request to delete match by Id
  // Response : message
  deleteTeamById(id) {

    return this.httpClient.delete<{ message: string }>(`${this.teamUrl}/${id}`);

  }


  // Request to update match
  // Response : message
  editTeam(newObj) {

    return this.httpClient.put(this.teamUrl, newObj);

  }

}
