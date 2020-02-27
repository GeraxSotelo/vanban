import _taskService from "../services/TaskService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";

//PUBLIC
export default class TasksController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .get("", this.getAll)
      .get("/:id", this.getById)
      .post("", this.create)
      .put("/:id/acomments", this.addCommentByTaskId)
      .put("/:id", this.edit)
      .put("/:id/dcomments", this.deleteCommentByTaskId)
      .delete("/:id", this.delete)
      .use(this.defaultRoute);
  }

  // this is pretty neat

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await _taskService.getAll(req.session.uid);
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await _taskService.getById(req.params.id, req.session.uid);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await _taskService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await _taskService.edit(
        req.params.id,
        req.session.uid,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await _taskService.delete(req.params.id, req.session.uid);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
  async addCommentByTaskId(req, res, next) {
    try {
      let data = await _taskService.addCommentByTaskId(
        req.params.id,
        req.session.uid,
        req.body
      );
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async deleteCommentByTaskId(req, res, next) {
    try {
      await _taskService.deleteCommentByTaskId(
        req.params.id,
        req.session.uid,
        req.body
      );
      return res.send("Successfully Deleted");
    } catch (error) {
      next(error);
    }
  }
}
