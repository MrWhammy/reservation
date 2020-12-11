import { NgModule } from '@angular/core';

import { ReservationSharedModule } from 'app/shared/shared.module';
import { ReservationComponent } from './reservation.component';
import { ReservationDetailComponent } from './reservation-detail.component';
import { ReservationUpdateComponent } from './reservation-update.component';
import { ReservationDeleteDialogComponent } from './reservation-delete-dialog.component';
import { ReservationRoute } from './reservation.route';
import { ReservationCandidacyModule } from '../candidacy/candidacy.module';

@NgModule({
  imports: [ReservationSharedModule, ReservationRoute, ReservationCandidacyModule],
  declarations: [ReservationComponent, ReservationDetailComponent, ReservationUpdateComponent, ReservationDeleteDialogComponent],
  entryComponents: [ReservationDeleteDialogComponent],
})
export class ReservationReservationModule {}
