import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReservationSharedModule } from 'app/shared/shared.module';
import { TerrainComponent } from './terrain.component';
import { TerrainDetailComponent } from './terrain-detail.component';
import { TerrainUpdateComponent } from './terrain-update.component';
import { TerrainDeleteDialogComponent } from './terrain-delete-dialog.component';
import { terrainRoute } from './terrain.route';

@NgModule({
  imports: [ReservationSharedModule, RouterModule.forChild(terrainRoute)],
  declarations: [TerrainComponent, TerrainDetailComponent, TerrainUpdateComponent, TerrainDeleteDialogComponent],
  entryComponents: [TerrainDeleteDialogComponent],
})
export class ReservationTerrainModule {}
