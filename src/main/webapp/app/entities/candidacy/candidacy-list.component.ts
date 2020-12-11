import { Component, Input } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICandidacy } from 'app/shared/model/candidacy.model';
import { CandidacyService } from './candidacy.service';
import { CandidacyDeleteDialogComponent } from './candidacy-delete-dialog.component';

@Component({
  selector: 'jhi-candidacy-list',
  templateUrl: './candidacy-list.component.html',
})
export class CandidacyListComponent {
  @Input() candidacies?: ICandidacy[];
  @Input() showReservation = true;

  constructor(protected candidacyService: CandidacyService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  trackId(index: number, item: ICandidacy): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  delete(candidacy: ICandidacy): void {
    const modalRef = this.modalService.open(CandidacyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.candidacy = candidacy;
  }
}
