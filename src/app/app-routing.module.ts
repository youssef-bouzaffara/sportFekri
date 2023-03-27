import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AdminComponent } from './components/admin/admin.component';
import { AllMatchesComponent } from './components/all-matches/all-matches.component';
import { EditMatchComponent } from './components/edit-match/edit-match.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { PlayersComponent } from './components/players/players.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { WeatherComponent } from './components/weather/weather.component';


const routes: Routes = [

  // http://localhost:4200 => Home component will be displayed
  { path:"",component:HomeComponent},
  // http://localhost:4200/signin => Login component will be displayed
  { path:"signin",component:LoginComponent},
  // http://localhost:4200/subscription => Signup component will be displayed
  { path:"subscription",component:SignupComponent},
  { path:"signupAdmin",component:SignupComponent},
  // http://localhost:4200/allMatches => AllMatches component will be displayed
  { path:"allMatches",component:AllMatchesComponent},
  // http://localhost:4200/allMatches => Players component will be displayed
  { path:"players",component:PlayersComponent},
  // http://localhost:4200/allMatches => AddMatch component will be displayed
  { path:"add-match",component:AddMatchComponent},
  // http://localhost:4200/allMatches => AddPlayer component will be displayed
  { path:"add-player",component:AddPlayerComponent},
  // http://localhost:4200/allMatches => AddTeam component will be displayed
  { path:"add-team",component:AddTeamComponent},
  // http://localhost:4200/allMatches => Admin component will be displayed
  { path:"admin",component:AdminComponent},
  // http://localhost:4200/allMatches => MatchInfo component will be displayed
  // ajouter ' : ' pour définir le paramètre
  { path:"matchInfo/:id",component:MatchInfoComponent},
  // http://localhost:4200/editMacth => EditMatch component will be displayed
  { path:"editMatch/:id",component:EditMatchComponent},
  { path:"search",component:SearchComponent},
  { path:"playerInfo/:id",component:PlayerInfoComponent},
  { path:"teamInfo/:id",component:TeamInfoComponent},
  { path:"updateMyProfile",component:ProfileComponent},
  { path:"weather",component:WeatherComponent}

  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
