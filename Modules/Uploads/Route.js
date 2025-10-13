import { Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();

// تجهيز التخزين على الlocal 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); ////// فولدر لحفظ الصور
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); ////// اسم مميز
  },
});

const upload = multer({ storage });

////// API لرفع صورة واحدة /////
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    console.log("req.file:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    ////// URL local ////
    const url = `http://localhost:3000/uploads/${req.file.filename}`;

    res.status(200).json({ imageURL: url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
