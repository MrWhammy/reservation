import { Moment } from 'moment';
import { IReservation } from 'app/shared/model/reservation.model';
import { IUser } from 'app/core/user/user.model';
import { CandidacyType } from 'app/shared/model/enumerations/candidacy-type.model';

export interface ICandidacy {
  id?: number;
  createdAt?: Moment;
  type?: CandidacyType;
  reservation?: IReservation;
  createdBy?: IUser;
}

export class Candidacy implements ICandidacy {
  constructor(
    public id?: number,
    public createdAt?: Moment,
    public type?: CandidacyType,
    public reservation?: IReservation,
    public createdBy?: IUser
  ) {}
}
