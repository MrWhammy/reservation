import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReservationTestModule } from '../../../test.module';
import { CandidacyComponent } from 'app/entities/candidacy/candidacy.component';
import { CandidacyService } from 'app/entities/candidacy/candidacy.service';
import { Candidacy } from 'app/shared/model/candidacy.model';

describe('Component Tests', () => {
  describe('Candidacy Management Component', () => {
    let comp: CandidacyComponent;
    let fixture: ComponentFixture<CandidacyComponent>;
    let service: CandidacyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReservationTestModule],
        declarations: [CandidacyComponent],
      })
        .overrideTemplate(CandidacyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CandidacyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CandidacyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Candidacy(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.candidacies && comp.candidacies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
