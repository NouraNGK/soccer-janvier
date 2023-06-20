import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  playersTab = [
    {name: "messi", nbr: "30", position: "atk", img:"assets/images/img_1.jpg"},
    {name: "CR7", nbr: "7", position: "MID", img:"assets/images/img_2.jpg"}
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
