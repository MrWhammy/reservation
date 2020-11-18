import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICandidacy, Candidacy } from 'app/shared/model/candidacy.model';
import { CandidacyService } from './candidacy.service';
import { IReservation } from 'app/shared/model/reservation.model';
import { ReservationService } from 'app/entities/reservation/reservation.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IReservation | IUser;

@Component({
  selector: 'jhi-candidacy-update',
  templateUrl: './candidacy-update.component.html',
})
export class CandidacyUpdateComponent implements OnInit {
  isSaving = false;
  reservations: IReservation[] = [];
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    createdAt: [null, [Validators.required]],
    type: [],
    reservation: [],
    createdBy: [],
  });

  constructor(
    protected candidacyService: CandidacyService,
    protected reservationService: ReservationService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ candidacy }) => {
      if (!candidacy.id) {
        const today = moment().startOf('day');
        candidacy.createdAt = today;
      }

      this.updateForm(candidacy);

      this.reservationService.query().subscribe((res: HttpResponse<IReservation[]>) => (this.reservations = res.body || []));

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(candidacy: ICandidacy): void {
    this.editForm.patchValue({
      id: candidacy.id,
      createdAt: candidacy.createdAt ? candidacy.createdAt.format(DATE_TIME_FORMAT) : null,
      type: candidacy.type,
      reservation: candidacy.reservation,
      createdBy: candidacy.createdBy,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const candidacy = this.createFromForm();
    if (candidacy.id !== undefined) {
      this.subscribeToSaveResponse(this.candidacyService.update(candidacy));
    } else {
      this.subscribeToSaveResponse(this.candidacyService.create(candidacy));
    }
  }

  private createFromForm(): ICandidacy {
    return {
      ...new Candidacy(),
      id: this.editForm.get(['id'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value ? moment(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
      type: this.editForm.get(['type'])!.value,
      reservation: this.editForm.get(['reservation'])!.value,
      createdBy: this.editForm.get(['createdBy'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICandidacy>>): void {
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
