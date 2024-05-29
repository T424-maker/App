import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const prisma = new PrismaClient();

const getUsers = async (username, name, email, phoneNumber, id) => {
  try {
    const filters = {};

    if (id) {
      filters.id = {
        equals: id,
      };
    }

    if (username) {
      filters.username = {
        contains: username,
      };
    }

    if (name) {
      filters.name = {
        contains: name,
      };
    }

    if (email) {
      filters.email = {
        contains: email,
      };
    }

    if (phoneNumber) {
      filters.phoneNumber = {
        contains: phoneNumber,
      };
    }

    const users = await prisma.user.findMany({
      where: filters,
    });

    if (!users || users.length === 0) {
      throw new NotFoundError("Users not found");
    }

    return users;
  } catch (error) {
    throw error;
  }
};

export default getUsers;
