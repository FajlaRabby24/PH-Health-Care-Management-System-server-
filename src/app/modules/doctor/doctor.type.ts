import { Gender } from "../../../generated/prisma/enums";

export interface IUpdateDoctor {
  name?: string;
  profilePhoto?: string;
  contactNumber?: string;
  registrationNumber?: string;
  experience?: number;
  gender?: Gender;
  appointmentFee?: number;
  qualification?: string;
  currentWorkingPlace?: string;
  designation?: string;
  specialties?: string[]; // Array of specialty IDs to update
}
