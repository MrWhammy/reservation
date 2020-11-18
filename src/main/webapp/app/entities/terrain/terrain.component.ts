import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITerrain } from 'app/shared/model/terrain.model';
import { TerrainService } from './terrain.service';
import { TerrainDeleteDialogComponent } from './terrain-delete-dialog.component';

@Component({
  selector: 'jhi-terrain',
  templateUrl: './terrain.component.html',
})
export class TerrainComponent implements OnInit, OnDestroy {
  terrains?: ITerrain[];
  eventSubscriber?: Subscription;

  constructor(protected terrainService: TerrainService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.terrainService.query().subscribe((res: HttpResponse<ITerrain[]>) => (this.terrains = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTerrains();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITerrain): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTerrains(): void {
    this.eventSubscriber = this.eventManager.subscribe('terrainListModification', () => this.loadAll());
  }

  delete(terrain: ITerrain): void {
    const modalRef = this.modalService.open(TerrainDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.terrain = terrain;
  }
}
