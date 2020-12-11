import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { ITerrain } from 'app/shared/model/terrain.model';
import { ICandidacy } from './candidacy.model';

export interface IReservation {
  id?: number;
  createdAt?: Moment;
  startTime?: Moment;
  createdBy?: IUser;
  terrain?: ITerrain;
  candidacies?: ICandidacy[];
}

export class Reservation implements IReservation {
  constructor(
    public id?: number,
    public createdAt?: Moment,
    public startTime?: Moment,
    public createdBy?: IUser,
    public terrain?: ITerrain,
    public candidacies?: ICandidacy[]
  ) {}
}
