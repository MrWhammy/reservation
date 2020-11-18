import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITerrain, Terrain } from 'app/shared/model/terrain.model';
import { TerrainService } from './terrain.service';
import { IClub } from 'app/shared/model/club.model';
import { ClubService } from 'app/entities/club/club.service';

@Component({
  selector: 'jhi-terrain-update',
  templateUrl: './terrain-update.component.html',
})
export class TerrainUpdateComponent implements OnInit {
  isSaving = false;
  clubs: IClub[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    club: [],
  });

  constructor(
    protected terrainService: TerrainService,
    protected clubService: ClubService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ terrain }) => {
      this.updateForm(terrain);

      this.clubService.query().subscribe((res: HttpResponse<IClub[]>) => (this.clubs = res.body || []));
    });
  }

  updateForm(terrain: ITerrain): void {
    this.editForm.patchValue({
      id: terrain.id,
      name: terrain.name,
      club: terrain.club,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const terrain = this.createFromForm();
    if (terrain.id !== undefined) {
      this.subscribeToSaveResponse(this.terrainService.update(terrain));
    } else {
      this.subscribeToSaveResponse(this.terrainService.create(terrain));
    }
  }

  private createFromForm(): ITerrain {
    return {
      ...new Terrain(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      club: this.editForm.get(['club'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITerrain>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IClub): any {
    return item.id;
  }
}
