import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReservationTestModule } from '../../../test.module';
import { TerrainComponent } from 'app/entities/terrain/terrain.component';
import { TerrainService } from 'app/entities/terrain/terrain.service';
import { Terrain } from 'app/shared/model/terrain.model';

describe('Component Tests', () => {
  describe('Terrain Management Component', () => {
    let comp: TerrainComponent;
    let fixture: ComponentFixture<TerrainComponent>;
    let service: TerrainService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReservationTestModule],
        declarations: [TerrainComponent],
      })
        .overrideTemplate(TerrainComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TerrainComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TerrainService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Terrain(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.terrains && comp.terrains[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
