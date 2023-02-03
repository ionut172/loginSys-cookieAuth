const productApp = async (req, res) => {
  res.send(`Welcome ${req.user.name}`);
};

module.exports = productApp;
