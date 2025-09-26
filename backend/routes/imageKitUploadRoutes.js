const express = require("express");
const multer = require("multer");
const ImageKit = require("imagekit");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static").path;
const sharp = require("sharp"); // for image processing
const { Readable, PassThrough } = require("stream");
const fs = require("fs");
const path = require("path");
const os = require("os");

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const imageKitUploadRoutes = (authenticateAdmin) => {
  const router = express.Router();

  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

  const upload = multer({ storage: multer.memoryStorage() });

  // Helper: get video duration
  const getVideoDuration = (buffer) => {
    return new Promise((resolve, reject) => {
      const stream = Readable.from(buffer);
      ffmpeg.ffprobe(stream, (err, metadata) => {
        if (err) return reject(err);
        resolve(metadata.format.duration); // seconds
      });
    });
  };
  

  const generateVideoThumbnail = (buffer, midSeconds) => {
    return new Promise((resolve, reject) => {
      const tempInput = path.join(os.tmpdir(), `input-${Date.now()}.mp4`);
      const tempThumb = path.join(os.tmpdir(), `thumb-${Date.now()}.jpg`);

      fs.writeFileSync(tempInput, buffer);

      ffmpeg(tempInput)
        .seekInput(midSeconds)
        .frames(1)
        .output(tempThumb)
        .on("end", () => {
          try {
            const thumbBuffer = fs.readFileSync(tempThumb);
            fs.unlinkSync(tempThumb);
            fs.unlinkSync(tempInput);
            resolve(thumbBuffer);
          } catch (err) {
            reject(err);
          }
        })
        .on("error", (err) => {
          fs.existsSync(tempInput) && fs.unlinkSync(tempInput);
          fs.existsSync(tempThumb) && fs.unlinkSync(tempThumb);
          reject(err);
        })
        .run();
    });
  };

  // Apply authenticateAdmin middleware to the upload route
  router.post(
    "/upload",
    authenticateAdmin,
    upload.single("file"),
    async (req, res) => {
      try {
        const file = req.file;
        if (!file)
          return res.status(400).json({ message: "No file uploaded." });

        const { folder } = req.body;
        const fileName = file.originalname;

        // 1️⃣ Upload original file
        const uploadResult = await imagekit.upload({
          file: file.buffer,
          fileName,
          folder: folder ? `/${folder}` : undefined,
        });

        let thumbnailBuffer;
        let thumbFileName = `thumb-${fileName.replace(/\.[^/.]+$/, ".jpg")}`;

        // 2️⃣ Generate thumbnail
        if (file.mimetype.startsWith("image/")) {
          thumbnailBuffer = await sharp(file.buffer)
            .resize({ width: 200 })
            .jpeg({ quality: 20 })
            .toBuffer();
        } else if (file.mimetype.startsWith("video/")) {
          const duration = await getVideoDuration(file.buffer);
          const midPoint = Math.floor(duration / 2);
          thumbnailBuffer = await generateVideoThumbnail(file.buffer, midPoint);
        }

        // 3️⃣ Upload thumbnail to ImageKit
        const thumbUpload = await imagekit.upload({
          file: thumbnailBuffer,
          fileName: thumbFileName,
          folder: folder ? `/${folder}/thumbnails` : "/thumbnails",
        });

        // 4️⃣ Return response
        res.status(200).json({
          url: uploadResult.url,
          fileId: uploadResult.fileId,
          thumbnail: thumbUpload.url,
        });
      } catch (error) {
        console.error("Upload failed:", error);
        res.status(500).json({
          message: "Internal server error",
          error: error.message,
        });
      }
    }
  );

  return router;
};

module.exports = imageKitUploadRoutes;
