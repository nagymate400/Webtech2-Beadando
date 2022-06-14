import express = require("express");

import { getRepository } from 'typeorm';
import { UserEntity } from '../Entity/UserEntity';

const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');

//CREATE A NEW User
router.post('', (req, res, next) => {
  const repository = getRepository(UserEntity);
  bcrypt.hash(req.body.password, 10).then((hash: any) => {
    const userEntity = repository.create({
      email: req.body.email,
      name: req.body.name,
      password: hash,
    });
    repository
      .save(userEntity)
      .then((result) => {
        res.status(201).json({
          messager: 'User created',
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          message: 'Something wrong with the doctror create',
        });
      });
  });
});

//LOGIN A User
router.post("/login", (req, res, next) => {
  console.log(req.body.email + " " + req.body.password)
  const repository = getRepository(UserEntity);
  let fecthedUser: any;
  repository.findOneOrFail({where:{ email: req.body.email}})
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fecthedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: fecthedUser.email, userId: fecthedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      })
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
      });
    });
});

//GET ALL User
router.get('', (req, res, next) => {
  const repository = getRepository(UserEntity);
  repository.find().then((result) => {
    return res.status(200).json({
      message: 'Elementes fetched succesfull',
      elements: result,
    });
  });
});

module.exports = router;