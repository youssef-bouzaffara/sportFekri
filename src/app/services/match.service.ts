import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({

  // provided fell app module dans la partie providers implicitement !!! on n'a pas besoin de déclarer donc dans app.module.ts fel partie providers
  providedIn: 'root'
})
export class MatchService {

  // Server BE address
  matchUrl: string = "http://localhost:3000/matches"
  constructor(private httpClient : HttpClient) { }

// Request to add match
// Response: message
  addMatch (obj){
    return this.httpClient.post<{message : string, isAdded : boolean}>(this.matchUrl,obj);
  }

  // Request to get All Matches
  // Response : [{}, {}, ....., {}]
  getAllMatches () {

    return this.httpClient.get<{matches : any, message : string}>(this.matchUrl);
  }

  // Request to get match by Id
  // Response : {}
  getMatchById (id){

    return this.httpClient.get<{match : any , isFinded : Boolean}>(`${this.matchUrl}/${id}`);

  }


  // Request to delete match by Id
  // Response : message
  deleteMatchById (id){

    return this.httpClient.delete<{msg : string}>(`${this.matchUrl}/${id}`);

  }

  
  // Request to update match
  // Response : message
  editMatch(newObj){

    return this.httpClient.put<{msg : string}>(this.matchUrl,newObj);

  }

  searchMatchesByScores(obj){

    return this.httpClient.post<{matches:any, message:string}>(this.matchUrl+"/searchByScores",obj);

  }


}
