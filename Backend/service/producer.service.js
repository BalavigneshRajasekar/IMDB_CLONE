const Producer = require("../models/producer.modal");

class ProducerService {
  async findOne(value) {
    try {
      const producer = await Producer.findOne(value);
      return producer;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async createProducer(value) {
    try {
      const producer = await Producer.create(value);
      producer.save();
      return producer;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = new ProducerService();
