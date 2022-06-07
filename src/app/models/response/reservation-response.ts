import { ReservationStatus } from "../entities/reservation-status";

export interface ReservationResponse {
  id: number;
  email: string;
  status: ReservationStatus;
  creationDate: string;
  reservationDate: string;
  numOfUsers: number;
  sportObjectId: number;
}
