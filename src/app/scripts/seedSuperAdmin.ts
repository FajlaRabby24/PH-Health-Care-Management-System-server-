import { Role } from "../../generated/prisma/enums";
import { envVars } from "../config/env";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

const seedSuperAdmin = async () => {
  const existingAdmin = await prisma.user.findFirst({
    where: {
      role: "SUPER_ADMIN",
    },
  });

  if (existingAdmin) {
    console.log("Super admin already exists.");
    return;
  }

  const userData = await auth.api.signUpEmail({
    body: {
      name: envVars.SUPER_ADMIN_NAME,
      email: envVars.SUPER_ADMIN_EMAIL,
      password: envVars.SUPER_ADMIN_PASSWORD,
      role: Role.SUPER_ADMIN,
    },
  });

  await prisma.admin.create({
    data: {
      userId: userData.user.id,
      name: envVars.SUPER_ADMIN_NAME,
      email: envVars.SUPER_ADMIN_EMAIL,
    },
  });

  console.log("Super admin seeded successfully.");
};

seedSuperAdmin();
