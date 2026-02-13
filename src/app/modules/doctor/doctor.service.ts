import status from "http-status";
import AppError from "../../errorHandlers/AppError";
import { prisma } from "../../lib/prisma";
import { IUpdateDoctorPayload } from "./doctor.type";

const getAllDoctors = async () => {
  const doctors = await prisma.doctor.findMany({
    include: {
      user: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });

  return doctors;
};

const getDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id,
    },
  });

  return doctor;
};

const updateDoctor = async (id: string, payload: IUpdateDoctorPayload) => {
  const doctor = await getDoctorById(id);
  if (!doctor) {
    throw new AppError(status.NOT_FOUND, "No doctor found");
  }

  const updateDoctor = await prisma.doctor.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });

  return updateDoctor;
};

const deleteDoctor = async (id: string) => {
  const deleteDoctor = await prisma.doctor.update({
    where: {
      id,
      isDeleted: false,
    },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });

  return deleteDoctor;
}; //soft delete

export const doctorServices = {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
