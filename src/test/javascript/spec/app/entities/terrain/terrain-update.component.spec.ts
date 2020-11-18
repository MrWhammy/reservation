import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ReservationTestModule } from '../../../test.module';
import { TerrainUpdateComponent } from 'app/entities/terrain/terrain-update.component';
import { TerrainService } from 'app/entities/terrain/terrain.service';
import { Terrain } from 'app/shared/model/terrain.model';

describe('Component Tests', () => {
  describe('Terrain Management Update Component', () => {
    let comp: TerrainUpdateComponent;
    let fixture: ComponentFixture<TerrainUpdateComponent>;
    let service: TerrainService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReservationTestModule],
        declarations: [TerrainUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TerrainUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TerrainUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TerrainService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Terrain(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Terrain();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
