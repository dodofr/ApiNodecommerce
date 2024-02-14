const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

module.exports = (req, res, next) => {
  const key = req.originalUrl || req.url;
  const cachedBody = cache.get(key);
  if (cachedBody) {
    console.log('Cache hit for key:', key);
    return res.send(cachedBody);
  } else {
    console.log('Cache miss for key:', key);
    res.sendResponse = res.send;
    res.send = (body) => {
      cache.set(key, body);
      res.sendResponse(body);
    };
    next();
  }
};