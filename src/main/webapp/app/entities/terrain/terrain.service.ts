import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITerrain } from 'app/shared/model/terrain.model';

type EntityResponseType = HttpResponse<ITerrain>;
type EntityArrayResponseType = HttpResponse<ITerrain[]>;

@Injectable({ providedIn: 'root' })
export class TerrainService {
  public resourceUrl = SERVER_API_URL + 'api/terrains';

  constructor(protected http: HttpClient) {}

  create(terrain: ITerrain): Observable<EntityResponseType> {
    return this.http.post<ITerrain>(this.resourceUrl, terrain, { observe: 'response' });
  }

  update(terrain: ITerrain): Observable<EntityResponseType> {
    return this.http.put<ITerrain>(this.resourceUrl, terrain, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITerrain>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITerrain[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
