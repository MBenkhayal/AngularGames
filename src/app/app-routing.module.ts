import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicTacToeComponent } from './games/tic-tac-toe/tic-tac-toe.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { GamesListComponent } from './games-list/games-list.component';
import { SnakeComponent } from './games/snake/snake.component';
import { BrickBreakerComponent } from './games/brick-breaker/brick-breaker.component';

const routes: Routes = [
  { path: '', redirectTo: '/gameslist', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
  { path: 'gameslist', component: GamesListComponent },
  { path: 'gameslist/tictactoe', component: TicTacToeComponent },
  { path: 'gameslist/snake', component: SnakeComponent },
  { path: 'gameslist/brickbreaker', component: BrickBreakerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
