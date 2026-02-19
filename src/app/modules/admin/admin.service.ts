import status from "http-status";
import { Role, UserStatus } from "../../../generated/prisma/enums";
import AppError from "../../errorHandlers/AppError";
import { IRequestUser } from "../../interfaces/requestUser.interface";
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
  return admin;
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
  return updatedAdmin;
};

// * soft delete admin by id
const softDeleteAdmin = async (id: string, user: IRequestUser) => {
  // Check if doctor exists and not deleted
  const isAdminExist = await getAdminById(id);

  if (isAdminExist.id === user.userId) {
    throw new AppError(status.BAD_REQUEST, "You cannot delete yourself");
  }

  const result = await prisma.$transaction(async (tx) => {
    await tx.admin.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    await tx.user.update({
      where: { id: isAdminExist.userId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        status: UserStatus.DELETED, // Optional: you may also want to block the user
      },
    });

    await tx.session.deleteMany({
      where: { userId: isAdminExist.userId },
    });

    await tx.account.deleteMany({
      where: { userId: isAdminExist.userId },
    });

    const admin = await getAdminById(id);

    return admin;
  });

  return result;
};

export const adminServices = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  softDeleteAdmin,
};
