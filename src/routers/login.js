import Express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = Express.Router();

router.post("/", async (req, res) => {
  const prisma = new PrismaClient();
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
      password: password,
    },
  });

  const host = await prisma.host.findUnique({
    where: {
      username: username,
      password: password,
    },
  });

  if (!host && !user) {
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }
  if (user) {
    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "User Login succesful", token });
  } else {
    const token = jwt.sign({ hostId: host.id }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Host Login succesful", token });
  }
});

export default router;
