import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT, TIME_FORMAT, DATE_FORMAT } from 'app/shared/constants/input.constants';

import { IReservation, Reservation } from 'app/shared/model/reservation.model';
import { ReservationService } from './reservation.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ITerrain } from 'app/shared/model/terrain.model';
import { TerrainService } from 'app/entities/terrain/terrain.service';

type SelectableEntity = ITerrain;

@Component({
  selector: 'jhi-reservation-update',
  templateUrl: './reservation-update.component.html',
})
export class ReservationUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  terrains: ITerrain[] = [];
  timeOptions: string[] = [];

  editForm = this.fb.group({
    id: [],
    startDay: [null, [Validators.required]],
    startTime: [null, [Validators.required]],
    terrain: [null, [Validators.required]],
  });

  constructor(
    protected reservationService: ReservationService,
    protected userService: UserService,
    protected terrainService: TerrainService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reservation }) => {
      if (!reservation.id) {
        const today = moment().startOf('day');
        reservation.createdAt = today;
        reservation.startTime = today;
      }

      this.timeOptions = Array.from({ length: 13 }, (_, i) => 9 + i)
        .map(hour => hour.toString().padStart(2, '0'))
        .map(hour => [hour + ':00', hour + ':30'])
        .reduce((acc, val) => acc.concat(val), []);

      this.updateForm(reservation);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.terrainService.query().subscribe((res: HttpResponse<ITerrain[]>) => (this.terrains = res.body || []));
    });
  }

  updateForm(reservation: IReservation): void {
    this.editForm.patchValue({
      id: reservation.id,
      startDay: reservation.startTime ? reservation.startTime.format(DATE_FORMAT) : null,
      startTime: reservation.startTime ? reservation.startTime.format(TIME_FORMAT) : null,
      terrain: reservation.terrain,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reservation = this.createFromForm();
    if (reservation.id !== undefined) {
      this.subscribeToSaveResponse(this.reservationService.update(reservation));
    } else {
      this.subscribeToSaveResponse(this.reservationService.create(reservation));
    }
  }

  private createFromForm(): IReservation {
    return {
      ...new Reservation(),
      id: this.editForm.get(['id'])!.value,
      startTime: this.editForm.get(['startTime'])!.value
        ? moment(this.editForm.get(['startDay'])!.value + 'T' + this.editForm.get(['startTime'])!.value, DATE_TIME_FORMAT)
        : undefined,
      terrain: this.editForm.get(['terrain'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReservation>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
