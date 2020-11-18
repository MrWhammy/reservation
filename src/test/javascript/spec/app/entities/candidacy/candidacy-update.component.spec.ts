import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ReservationTestModule } from '../../../test.module';
import { CandidacyUpdateComponent } from 'app/entities/candidacy/candidacy-update.component';
import { CandidacyService } from 'app/entities/candidacy/candidacy.service';
import { Candidacy } from 'app/shared/model/candidacy.model';

describe('Component Tests', () => {
  describe('Candidacy Management Update Component', () => {
    let comp: CandidacyUpdateComponent;
    let fixture: ComponentFixture<CandidacyUpdateComponent>;
    let service: CandidacyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReservationTestModule],
        declarations: [CandidacyUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CandidacyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CandidacyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CandidacyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Candidacy(123);
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
        const entity = new Candidacy();
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
