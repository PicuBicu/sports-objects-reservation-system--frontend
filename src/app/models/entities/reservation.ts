import { SportObject } from "app/sport-objects/sport-object";
import { ReservationStatus } from "./reservation-status";
import { User } from "./user";

export interface Reservation {
  id: number;
  user: User;
  status: ReservationStatus;
  creationDate: string;
  reservationDate: string;
  numOfUsers: number;
  sportObject: SportObject;
}
