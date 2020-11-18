import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITerrain } from 'app/shared/model/terrain.model';
import { TerrainService } from './terrain.service';

@Component({
  templateUrl: './terrain-delete-dialog.component.html',
})
export class TerrainDeleteDialogComponent {
  terrain?: ITerrain;

  constructor(protected terrainService: TerrainService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.terrainService.delete(id).subscribe(() => {
      this.eventManager.broadcast('terrainListModification');
      this.activeModal.close();
    });
  }
}
