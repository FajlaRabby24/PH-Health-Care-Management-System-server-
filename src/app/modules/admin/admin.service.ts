import status from "http-status";
import { Role } from "../../../generated/prisma/enums";
import AppError from "../../errorHandlers/AppError";
import { prisma } from "../../lib/prisma";
import { IUpdateAdmin } from "./admin.type";

// * get all admins
const getAllAdmins = async () => {
  const admins = await prisma.admin.findMany({
    where: {
      user: {
        role: Role.ADMIN,
      },
    },
    include: {
      user: true,
    },
  });

  return admins;
};

// * get admin by id
const getAdminById = async (id: string) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
      user: {
        role: Role.ADMIN,
      },
    },
  });

  if (!admin) {
    throw new AppError(status.NOT_FOUND, "Admin not found");
  }

  // Transform specialties to flatten structure
  return {
    ...admin,
  };
};

// * update admin by id
const updateAdmin = async (id: string, payload: IUpdateAdmin) => {
  // Check if doctor exists and not deleted
  await getAdminById(id);

  // Update doctor basic information
  const updatedAdmin = await prisma.admin.update({
    where: {
      id,
      user: {
        role: Role.ADMIN,
      },
    },
    data: payload,
  });

  // Return updated admin with transformed specialties
  return {
    ...updatedAdmin,
  };
};

// * soft delete admin by id
const softDeleteAdmin = async (id: string) => {
  // Check if admin exists and not already deleted
  const admin = await getAdminById(id);

  if (admin.isDeleted) {
    throw new AppError(status.BAD_REQUEST, "Admin is already deleted");
  }

  // Mark doctor as deleted
  const result = await prisma.admin.update({
    where: {
      id,
      user: {
        role: Role.ADMIN,
      },
    },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });

  return result;
};

export const adminServices = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  softDeleteAdmin,
};
