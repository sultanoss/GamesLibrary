import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { APIResponse, Game } from 'src/models';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private activatedRout: ActivatedRoute
  ) {}

  public sort: string | undefined;
  public games: Array<Game> = [];

  ngOnInit(): void {
    this.activatedRout.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort:string,search?:string){
    this.httpService
    .getGameList(sort,search)
    .subscribe((gameList:APIResponse<Game>)=>{
      this.games = gameList.results;
      console.log(gameList);
    })
  }

}
