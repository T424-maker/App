import Express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

// Models
import createReview from "../models/reviews/createReview.js";
import deletReview from "../models/reviews/deleteReview.js";
import getReviewById from "../models/reviews/getReviewById.js";
import getReviews from "../models/reviews/getReviews.js";
import updateReview from "../models/reviews/updateReview.js";

const router = Express.Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const review = await getReviewById(req.params.id);
      res.status(200).send(review);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { propertyId, userId, rating, comment } = req.body;
    const review = await createReview(propertyId, userId, rating, comment);
    res.status(201).send(review);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { propertyId, userId, rating, comment } = req.body;
    const updatedReview = await updateReview(
      id,
      propertyId,
      userId,
      rating,
      comment
    );
    res.status(200).send(updatedReview);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedReview = await deletReview(id);
    res.status(200).json({
      message: `Review with id ${id} has been deleted successfully!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="5551a130-36f0-5e8d-9566-bc89e8a6d33a")}catch(e){}}();
//# debugId=5551a130-36f0-5e8d-9566-bc89e8a6d33a


   
