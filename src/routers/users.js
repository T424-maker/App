import Express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

// Models
import createUser from "../models/users/createUser.js";
import deletUser from "../models/users/deletUser.js";
import getUserById from "../models/users/getUserById.js";
import getUsers from "../models/users/getUsers.js";
import updateUser from "../models/users/updateUser.js";

const router = Express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { username, name, email, phoneNumber, id } = req.query;
    const users = await getUsers(username, name, email, phoneNumber, id);
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await getUserById(id);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const user = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const updatedUser = await updateUser(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
  notFoundErrorHandler;
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await deletUser(id);
    res.status(200).json({
      message: `User with id ${id} has been deleted successfully!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
