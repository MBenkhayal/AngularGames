import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicTacToeComponent } from './games/tic-tac-toe/tic-tac-toe.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { GamesListComponent } from './games-list/games-list.component';
import { SnakeComponent } from './games/snake/snake.component';

const routes: Routes = [
  { path: 'gameslist', component: GamesListComponent },
  { path: 'gameslist/tictactoe', component: TicTacToeComponent },
  { path: 'gameslist/snake', component: SnakeComponent },
  { path: '', redirectTo: '/gameslist', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
