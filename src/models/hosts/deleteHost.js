import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const deleteHost = async (id) => {
  try {
    if (!id) {
      throw new errorHandler("id is required");
    }

    const deleteHost = await prisma.host.deleteMany({
      where: {
        id,
      },
    });

    if (!deleteHost || deleteHost.count === 0) {
      throw new NotFoundError("Host", id);
    }

    return id;
  } catch (error) {
    throw error; // Re-gooi de fout omhoog voor verdere afhandeling
  }
};

export default deleteHost;
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ac8c5d76-3162-5581-a17e-e0260172b5b8")}catch(e){}}();
/
