import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReservationTestModule } from '../../../test.module';
import { CandidacyDetailComponent } from 'app/entities/candidacy/candidacy-detail.component';
import { Candidacy } from 'app/shared/model/candidacy.model';

describe('Component Tests', () => {
  describe('Candidacy Management Detail Component', () => {
    let comp: CandidacyDetailComponent;
    let fixture: ComponentFixture<CandidacyDetailComponent>;
    const route = ({ data: of({ candidacy: new Candidacy(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReservationTestModule],
        declarations: [CandidacyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CandidacyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CandidacyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load candidacy on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.candidacy).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
