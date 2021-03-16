// DO YOUR MAGIC
const router = require("express").Router();
const Car = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

router.get("/", (req, res, next) => {
  Car.getAll()
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch(next);
});

router.get("/:id", checkCarId, (req, res, next) => {
  Car.getById(req.params.id)
    .then((car) => {
      res.status(200).json(car);
    })
    .catch(next);
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
  (req, res, next) => {
    Car.create(req.body)
      .then((car) => {
        res.status(201).json(car);
      })
      .catch(next);
  }
);

router.use((err, req, res, next) /* eslint-disable-line */ => {
  res.status(500).json({
    message: "Something is wrong in router.",
    error: err.message,
    stack: err.stack,
  });
});

module.exports = router;
