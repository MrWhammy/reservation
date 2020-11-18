import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'reservation',
        loadChildren: () => import('./reservation/reservation.module').then(m => m.ReservationReservationModule),
      },
      {
        path: 'candidacy',
        loadChildren: () => import('./candidacy/candidacy.module').then(m => m.ReservationCandidacyModule),
      },
      {
        path: 'club',
        loadChildren: () => import('./club/club.module').then(m => m.ReservationClubModule),
      },
      {
        path: 'terrain',
        loadChildren: () => import('./terrain/terrain.module').then(m => m.ReservationTerrainModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class ReservationEntityModule {}
