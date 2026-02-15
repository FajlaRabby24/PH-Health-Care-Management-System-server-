import status from "http-status";
import { Role } from "../../../generated/prisma/enums";
import AppError from "../../errorHandlers/AppError";
import { prisma } from "../../lib/prisma";
import { IUpdateSuperAdmin } from "./superAdmin.type";

// * get all super admins
const getAllSuperAdmins = async () => {
  const admins = await prisma.admin.findMany({
    where: {
      user: {
        role: Role.SUPER_ADMIN,
      },
    },
    include: {
      user: true,
    },
  });

  return admins;
};

// * get super admin by id
const getSuperAdminById = async (id: string) => {
  const superAdmin = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
      user: {
        role: Role.SUPER_ADMIN,
      },
    },
  });

  if (!superAdmin) {
    throw new AppError(status.NOT_FOUND, "Super admin not found");
  }

  // Transform specialties to flatten structure
  return superAdmin;
};

// * update super admin by id
const updateSuperAdmin = async (id: string, payload: IUpdateSuperAdmin) => {
  // Check if doctor exists and not deleted
  await getSuperAdminById(id);

  // Update doctor basic information
  const updateSuperdAdmin = await prisma.admin.update({
    where: {
      id,
      user: {
        role: Role.SUPER_ADMIN,
      },
    },
    data: payload,
  });

  // Return updated admin with transformed specialties
  return updateSuperdAdmin;
};

// * soft delete super admin by id
const softDeleteSuperAdmin = async (id: string) => {
  // Check if admin exists and not already deleted
  const superAdmin = await getSuperAdminById(id);

  if (superAdmin.isDeleted) {
    throw new AppError(status.BAD_REQUEST, "Super admin is already deleted");
  }

  // Mark doctor as deleted
  const result = await prisma.admin.update({
    where: {
      id,
      user: {
        role: Role.SUPER_ADMIN,
      },
    },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });

  return result;
};

export const superAdminServices = {
  getAllSuperAdmins,
  getSuperAdminById,
  updateSuperAdmin,
  softDeleteSuperAdmin,
};
