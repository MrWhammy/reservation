import { IClub } from 'app/shared/model/club.model';

export interface ITerrain {
  id?: number;
  name?: string;
  club?: IClub;
}

export class Terrain implements ITerrain {
  constructor(public id?: number, public name?: string, public club?: IClub) {}
}
