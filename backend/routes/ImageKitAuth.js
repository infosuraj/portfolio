const express = require("express");
const ImageKit = require("imagekit");

const imageKitAuthRoutes = () => {
  const router = express.Router();

  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

  router.get('/auth', (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.json(result);
  });

  return router;
};

module.exports = imageKitAuthRoutes;
