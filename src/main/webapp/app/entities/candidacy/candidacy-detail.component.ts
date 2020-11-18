import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICandidacy } from 'app/shared/model/candidacy.model';

@Component({
  selector: 'jhi-candidacy-detail',
  templateUrl: './candidacy-detail.component.html',
})
export class CandidacyDetailComponent implements OnInit {
  candidacy: ICandidacy | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ candidacy }) => (this.candidacy = candidacy));
  }

  previousState(): void {
    window.history.back();
  }
}
