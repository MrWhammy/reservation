import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICandidacy } from 'app/shared/model/candidacy.model';
import { CandidacyService } from './candidacy.service';
import { CandidacyDeleteDialogComponent } from './candidacy-delete-dialog.component';

@Component({
  selector: 'jhi-candidacy',
  templateUrl: './candidacy.component.html',
})
export class CandidacyComponent implements OnInit, OnDestroy {
  candidacies?: ICandidacy[];
  eventSubscriber?: Subscription;

  constructor(protected candidacyService: CandidacyService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.candidacyService.query().subscribe((res: HttpResponse<ICandidacy[]>) => (this.candidacies = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCandidacies();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICandidacy): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCandidacies(): void {
    this.eventSubscriber = this.eventManager.subscribe('candidacyListModification', () => this.loadAll());
  }

  delete(candidacy: ICandidacy): void {
    const modalRef = this.modalService.open(CandidacyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.candidacy = candidacy;
  }
}
