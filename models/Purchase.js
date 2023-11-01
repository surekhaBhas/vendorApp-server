const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema(
  {
    product_name: String,
    quantity: String,
    date: String,
    pdf: String,
    vendor: {
      type: mongoose.ObjectId,
      ref: 'User',
      required: true,
    },
    user: {
      type: mongoose.ObjectId,
      ref: 'User',
    },
    message: {
      type: String,
      default: '',
    },
    schedule1: {
      shipping: {
        type:String,
         default:''
      },
      response:{
        type: String,
        default:"no"
      }
    },
    schedule2: {
      shipping: {
        type:String,
         default:''
      },
      response:{
        type: String,
        default:"no"
      }
    },
    schedule3: {
      shipping: {
        type:String,
         default:''
      },
      response:{
        type: String,
        default:"no"
      }
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PurchaseOrder', purchaseSchema);
