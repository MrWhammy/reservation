import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICandidacy } from 'app/shared/model/candidacy.model';

type EntityResponseType = HttpResponse<ICandidacy>;
type EntityArrayResponseType = HttpResponse<ICandidacy[]>;

@Injectable({ providedIn: 'root' })
export class CandidacyService {
  public resourceUrl = SERVER_API_URL + 'api/candidacies';

  constructor(protected http: HttpClient) {}

  create(candidacy: ICandidacy): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(candidacy);
    return this.http
      .post<ICandidacy>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(candidacy: ICandidacy): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(candidacy);
    return this.http
      .put<ICandidacy>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICandidacy>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICandidacy[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(candidacy: ICandidacy): ICandidacy {
    const copy: ICandidacy = Object.assign({}, candidacy, {
      createdAt: candidacy.createdAt && candidacy.createdAt.isValid() ? candidacy.createdAt.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt ? moment(res.body.createdAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((candidacy: ICandidacy) => {
        candidacy.createdAt = candidacy.createdAt ? moment(candidacy.createdAt) : undefined;
      });
    }
    return res;
  }
}
