import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICandidacy, Candidacy } from 'app/shared/model/candidacy.model';
import { CandidacyService } from './candidacy.service';
import { CandidacyComponent } from './candidacy.component';
import { CandidacyDetailComponent } from './candidacy-detail.component';
import { CandidacyUpdateComponent } from './candidacy-update.component';

@Injectable({ providedIn: 'root' })
export class CandidacyResolve implements Resolve<ICandidacy> {
  constructor(private service: CandidacyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICandidacy> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((candidacy: HttpResponse<Candidacy>) => {
          if (candidacy.body) {
            return of(candidacy.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Candidacy());
  }
}

export const candidacyRoute: Routes = [
  {
    path: '',
    component: CandidacyComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'reservationApp.candidacy.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CandidacyDetailComponent,
    resolve: {
      candidacy: CandidacyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'reservationApp.candidacy.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CandidacyUpdateComponent,
    resolve: {
      candidacy: CandidacyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'reservationApp.candidacy.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CandidacyUpdateComponent,
    resolve: {
      candidacy: CandidacyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'reservationApp.candidacy.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
