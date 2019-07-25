const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient({ url: process.env.REDIS_URL });

const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);

module.exports = {

  async set(key, value) {
    delete value.__v;
    return set(key.toString(), JSON.stringify(value));
  },

  async get(key) {
    const value = await get(key.toString());
    if (value) return JSON.parse(value);
  }

};
