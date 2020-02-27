import mongoose from "mongoose";
import Task from "../models/Task";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Task", Task);

class TaskService {
  async getAll(userId) {
    return await _repository.find({ authorId: userId });
  }

  async getById(id, userId) {
    let data = await _repository.findOne({ _id: id, authorId: userId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this board", 400);
    }
    return data;
  }

  async create(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }

  async edit(id, userId, update) {
    let data = await _repository.findOneAndUpdate(
      { _id: id, authorId: userId },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this board", 400);
    }
    return data;
  }

  async delete(id, userId) {
    let data = await _repository.findOneAndRemove({
      _id: id,
      authorId: userId
    });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this board", 400);
    }
  }
  async addCommentByTaskId(id, userId, body) {
    let data = await _repository.findOneAndUpdate(
      // $push is a mongoose method, you will pass the body of the child which in this case is comments
      // new true is the new updated object
      // NOTE Task ID
      { _id: id, authorId: userId },
      { $push: { comments: body } },
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid Comment to Add", 400);
    }
    return data;
  }
  async deleteCommentByTaskId(id, userId, body) {
    let data = await _repository.findOneAndUpdate(
      {
        _id: id,
        authorId: userId
      },
      { $pull: { comments: { _id: body._id } } },
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid Comment to Delete", 400);
    }
    return data;
  }
}

const _taskService = new TaskService();
export default _taskService;
