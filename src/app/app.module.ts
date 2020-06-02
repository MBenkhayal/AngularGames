import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesListComponent } from './games-list/games-list.component';
import { TicTacToeComponent } from './games/tic-tac-toe/tic-tac-toe.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { SnakeComponent } from './games/snake/snake.component';
import { BrickBreakerComponent } from './games/brick-breaker/brick-breaker.component';
import { PongComponent } from './games/pong/pong.component';
import { BrickJumperComponent } from './games/brick-jumper/brick-jumper.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    TicTacToeComponent,
    PageNotFoundComponent,
    SnakeComponent,
    BrickBreakerComponent,
    PongComponent,
    BrickJumperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
