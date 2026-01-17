const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;

  // Log request
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);

  // Log response when finished
  const originalSend = res.send;
  res.send = function (data) {
    console.log(`[${timestamp}] ${method} ${url} - Status: ${res.statusCode}`);
    return originalSend.call(this, data);
  };

  next();
};

module.exports = logger;
