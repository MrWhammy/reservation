import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReservationTestModule } from '../../../test.module';
import { TerrainDetailComponent } from 'app/entities/terrain/terrain-detail.component';
import { Terrain } from 'app/shared/model/terrain.model';

describe('Component Tests', () => {
  describe('Terrain Management Detail Component', () => {
    let comp: TerrainDetailComponent;
    let fixture: ComponentFixture<TerrainDetailComponent>;
    const route = ({ data: of({ terrain: new Terrain(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReservationTestModule],
        declarations: [TerrainDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TerrainDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TerrainDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load terrain on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.terrain).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
