import status from "http-status";
import AppError from "../../errorHandlers/AppError";
import { prisma } from "../../lib/prisma";
import { IUpdateDoctor } from "./doctor.type";

// * get all doctors
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

// * get doctor by id
const getDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });

  if (!doctor) {
    throw new AppError(status.NOT_FOUND, "Doctor not found");
  }

  // Transform specialties to flatten structure
  return {
    ...doctor,
    specialties: doctor.specialties.map((s) => s.specialty),
  };
};

// * update doctory by id
const updateDoctor = async (id: string, payload: IUpdateDoctor) => {
  // Check if doctor exists and not deleted
  await getDoctorById(id);

  // Separate specialties from doctor data
  const { specialties, ...doctorData } = payload;

  // Update doctor basic information
  const updatedDoctor = await prisma.doctor.update({
    where: { id },
    data: doctorData,
    include: {
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });

  // If specialties are provided, update them separately
  if (specialties && specialties.length > 0) {
    // Delete old specialties
    await prisma.doctorSpecialty.deleteMany({
      where: { doctorId: id },
    });

    // Add new specialties
    const specialtiesData = specialties.map((specialtyId) => ({
      doctorId: id,
      specialtyId,
    }));

    await prisma.doctorSpecialty.createMany({
      data: specialtiesData,
    });

    // Fetch updated doctor with new specialties
    const result = await prisma.doctor.findUnique({
      where: { id },
      include: {
        specialties: {
          include: {
            specialty: true,
          },
        },
      },
    });

    return {
      ...result,
      specialties: result?.specialties.map((s) => s.specialty) || [],
    };
  }

  // Return updated doctor with transformed specialties
  return {
    ...updatedDoctor,
    specialties: updatedDoctor.specialties.map((s) => s.specialty),
  };
};

// * soft delete doctor by id
const softDeleteDoctor = async (id: string) => {
  // Check if doctor exists and not already deleted
  const doctor = await getDoctorById(id);

  if (doctor.isDeleted) {
    throw new AppError(status.BAD_REQUEST, "Doctor is already deleted");
  }

  // Mark doctor as deleted
  const result = await prisma.doctor.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });

  return result;
};

export const doctorServices = {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  softDeleteDoctor,
};
