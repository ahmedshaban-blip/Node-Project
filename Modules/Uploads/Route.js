import { Router } from "express";
import multer from "multer";
import admin from "firebase-admin";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });


router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const bucket = admin.storage().bucket();
    const file = bucket.file(`uploads/${Date.now()}-${req.file.originalname}`);

    await file.save(req.file.buffer, {
      metadata: { contentType: req.file.mimetype },
    });

    const [url] = await file.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });

    res.status(200).json({ imageURL: url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
