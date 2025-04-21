const express = require("express");
const router = express.Router();
const jokeController = require("../controller/joke.controller");

router.post("/", jokeController.createdJoke);

router.get("/random", jokeController.getRandomJoke);

router.get("/:id", jokeController.getJokeById);

router.get('/', jokeController.getAllJokes);
module.exports = router;