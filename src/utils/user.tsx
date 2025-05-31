// prisma
import { prisma } from '@/lib/prisma';

export async function createUser() {
  const userCreate = await prisma.user.create({
    data: {
      name: 'John Doe',
    },
  });
  return userCreate;
}

export async function listUser() {
  const userList = await prisma.user.findMany();
  return userList;
}

export async function deleteUser(id:string) {
  const userDelete = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return userDelete;
}
