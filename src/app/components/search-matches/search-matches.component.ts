import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-search-matches',
  templateUrl: './search-matches.component.html',
  styleUrls: ['./search-matches.component.css']
})
export class SearchMatchesComponent implements OnInit {

  searchForm: FormGroup;
  findedMatches: any;
  constructor(private formBuilder: FormBuilder,
    private matchService: MatchService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      s1: ["", [Validators.required]],
      s2: ["", [Validators.required]]
    })
  }

  search() {
    this.matchService.searchMatches(this.searchForm.value).subscribe(
      (response) => {
        console.log("Here response from BE", response.matches);
        this.findedMatches = response.matches;
      }
    );
  }
}
