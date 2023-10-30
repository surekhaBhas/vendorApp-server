const express = require('express');
const router = express.Router();
const {requireSignIn,isVendor}=require('../middlewares/authMiddleware')
const multer = require('multer');
const purchaseModel = require('../models/Purchase');

const path=require('path');
const {getVendorOrders,updateScheduleResponse,updateScheduleShipping,giveAcknowledge,orderData,getUserOrders}=require('../controllers/purchaseController')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/order',requireSignIn, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  console.log(req.file);
  const { product_name, quantity, date, vendor } = req.body;
  const fileName = req.file.filename;

  try {
    await purchaseModel.create({
      product_name,
      quantity,
      date,
      vendor,
      pdf: fileName,
      user:req.user._id
    });
    res.send({ status: 'ok' });
  } catch (error) {
    res.json({ status: error });
  }
});

router.get("/vendor/:id",getVendorOrders)

router.put('/message/:id',giveAcknowledge)

router.put('/response/:id/:scheduleNumber',updateScheduleResponse)

router.put('/shipping/:id/:scheduleNumber',updateScheduleShipping)

router.get('/order/:id',orderData)

router.get('/user/:id',getUserOrders)



module.exports = router;
