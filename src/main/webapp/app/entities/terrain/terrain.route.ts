import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITerrain, Terrain } from 'app/shared/model/terrain.model';
import { TerrainService } from './terrain.service';
import { TerrainComponent } from './terrain.component';
import { TerrainDetailComponent } from './terrain-detail.component';
import { TerrainUpdateComponent } from './terrain-update.component';

@Injectable({ providedIn: 'root' })
export class TerrainResolve implements Resolve<ITerrain> {
  constructor(private service: TerrainService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITerrain> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((terrain: HttpResponse<Terrain>) => {
          if (terrain.body) {
            return of(terrain.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Terrain());
  }
}

export const terrainRoute: Routes = [
  {
    path: '',
    component: TerrainComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'reservationApp.terrain.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TerrainDetailComponent,
    resolve: {
      terrain: TerrainResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'reservationApp.terrain.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TerrainUpdateComponent,
    resolve: {
      terrain: TerrainResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'reservationApp.terrain.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TerrainUpdateComponent,
    resolve: {
      terrain: TerrainResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'reservationApp.terrain.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
