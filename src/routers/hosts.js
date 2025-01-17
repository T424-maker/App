import Express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

// Models
import createHost from "../models/hosts/createHost.js";
import deleteHost from "../models/hosts/deleteHost.js";
import getHostById from "../models/hosts/getHostById.js";
import getHosts from "../models/hosts/getHosts.js";
import updateHost from "../models/hosts/updateHost.js";

const router = Express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { username, name, email, phoneNumber } = req.query;
    const hosts = await getHosts(username, name, email, phoneNumber);
    res.status(200).send(hosts);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const Host = await getHostById(req.params.id);
      res.status(200).send(Host);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const host = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).send(host);
  } catch (error) {
    next(error);
  }
});

// username,
// password,
// name,
// email,
// phoneNumber,
// profilePicture,
// aboutMe

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    console.log("req.body:", req.body);
    const updatedHost = await updateHost(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(200).send(updatedHost);
  } catch (error) {
    next(error);
  }
  notFoundErrorHandler;
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedHost = await deleteHost(id);
    res.status(200).json({
      message: `Host with id ${id} has been deleted successfully!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b93904ad-ab13-5f14-9bf2-89cca7d001b3")}catch(e){}}();
//# debugId=b93904ad-ab13-5f14-9bf2-89cca7d001b3

