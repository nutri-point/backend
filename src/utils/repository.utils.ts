import { Prisma, User } from '@prisma/client';
import { RoleName } from 'auth/roles/role.enum';
import { PrismaService } from 'shared/prisma.service';

export const getWhereFilterForUser = async (
  user: User,
  prisma: PrismaService,
) => {
  const role = await prisma.role.findUnique({
    where: { id: user.roleId },
  });

  let where: Prisma.GoalWhereInput | undefined;
  if (role.name !== RoleName.Admin) {
    where = { userId: user.id };
  }

  return where;
};
