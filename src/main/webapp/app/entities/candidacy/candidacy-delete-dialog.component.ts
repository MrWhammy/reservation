import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICandidacy } from 'app/shared/model/candidacy.model';
import { CandidacyService } from './candidacy.service';

@Component({
  templateUrl: './candidacy-delete-dialog.component.html',
})
export class CandidacyDeleteDialogComponent {
  candidacy?: ICandidacy;

  constructor(protected candidacyService: CandidacyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.candidacyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('candidacyListModification');
      this.activeModal.close();
    });
  }
}
