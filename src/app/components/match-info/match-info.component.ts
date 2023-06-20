import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {
  findedMatch: any;
  
  constructor(private matchService: MatchService) { }

  ngOnInit() {
    let id = localStorage.getItem("id");
    this.matchService.getMatchById(id).subscribe((response) => {
      console.log("Here response BE", response.match);
      this.findedMatch = response.match;
    });

  }
}
