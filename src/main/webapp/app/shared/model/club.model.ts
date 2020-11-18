export interface IClub {
  id?: number;
  name?: string;
}

export class Club implements IClub {
  constructor(public id?: number, public name?: string) {}
}
