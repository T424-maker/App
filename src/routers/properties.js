import Express from "express";
import authMiddleware from "../middleware/auth.js";

// Models
import createProperty from "../models/properties/createProperty.js";
import deletProperty from "../models/properties/deletProperty.js";
import getPropertyById from "../models/properties/getPropertyById.js";
import getProperties from "../models/properties/getProperties.js";
import updateProperty from "../Models/properties/updateProperty.js";

import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Express.Router();

router.get("/", async (req, res, next) => {
  try {
    const {
      title,
      pricePerNight,
      bedroomCount,
      maxGuestCount,
      rating,
      amenities,
    } = req.query;
    const properties = await getProperties(
      title,
      pricePerNight,
      bedroomCount,
      maxGuestCount,
      rating,
      amenities
    );
    res.status(200).send(properties);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const property = await getPropertyById(req.params.id);
      res.status(200).send(property);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      bookings,
      reviews,
      amenities,
      hostId,
    } = req.body;
    const property = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      bookings,
      reviews,
      amenities,
      hostId
    );
    res.status(201).send(property);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      bookings,
      reviews,
      amenities,
      hostId,
    } = req.body;
    const updatedProperty = await updateProperty(
      id,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      bookings,
      reviews,
      amenities,
      hostId
    );
    res.status(200).send(updatedProperty);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProperty = await deletProperty(id);
    res.status(200).json({
      message: `Property with id: ${id} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
