import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReservationSharedModule } from 'app/shared/shared.module';
import { CandidacyComponent } from './candidacy.component';
import { CandidacyDetailComponent } from './candidacy-detail.component';
import { CandidacyUpdateComponent } from './candidacy-update.component';
import { CandidacyDeleteDialogComponent } from './candidacy-delete-dialog.component';
import { candidacyRoute } from './candidacy.route';

@NgModule({
  imports: [ReservationSharedModule, RouterModule.forChild(candidacyRoute)],
  declarations: [CandidacyComponent, CandidacyDetailComponent, CandidacyUpdateComponent, CandidacyDeleteDialogComponent],
  entryComponents: [CandidacyDeleteDialogComponent],
})
export class ReservationCandidacyModule {}
