const Actor = require("../models/actors.modal");

class ActorService {
  async findOne(value) {
    try {
      const actor = await Actor.findOne(value);
      return actor;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async createActor(value) {
    try {
      const actor = await Actor.create(value);
      actor.save();
      console.log(actor);

      return actor;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async editActors(value) {
    try {
      console.log(value);

      const movie = await Actor.findOneAndUpdate(
        value.actorName,
        {
          $set: value,
        },
        { new: true, runValidators: true }
      );

      return movie;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = new ActorService();
