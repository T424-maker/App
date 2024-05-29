import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const getHosts = async (username, name, email, phoneNumber) => {
  try {
    const filters = {};

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

    const hosts = await prisma.host.findMany({
      where: filters,
    });

    if (hosts.length === 0) {
      throw new NotFoundError("No hosts found");
    }

    return hosts;
  } catch (error) {
    throw error; // Re-gooi de fout omhoog voor verdere afhandeling
  }
};

export default getHosts;
