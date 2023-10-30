const purchaseModel=require('../models/Purchase')
const userModel=require('../models/User')

const getVendorOrders=async(req,res)=>{
  const {id}=req.params
  try{
    const purchaseOrders=await purchaseModel.find({vendor:id}).sort({createdAt:"-1"})
    res.send(purchaseOrders)
  }catch(err){
    res.send(err)
    console.log(err)
  }
}

const giveAcknowledge = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body; 

  try {
    const order = await purchaseModel.findOneAndUpdate(
      { _id: id },
      { message: message }, 
      { new: true } 
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateScheduleShipping = async (req, res) => {
  const { id, scheduleNumber } = req.params;
  const { shipping } = req.body;

  try {
 
    const scheduleField = `schedule${scheduleNumber}`;

    const order = await purchaseModel.findById(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order[scheduleField]) {
      order[scheduleField].shipping = shipping;
    } else {
      order[scheduleField] = { shipping };
    }

    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


const updateScheduleResponse = async (req, res) => {
  const { id, scheduleNumber } = req.params;
  const { response } = req.body;

  try {
   
    const scheduleField = `schedule${scheduleNumber}`;


    const order = await purchaseModel.findById(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order[scheduleField]) {
      order[scheduleField].response = response;
    } else {
      order[scheduleField] = { response };
    }

    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};



const orderData=async(req,res)=>{
  const {id}=req.params
  try{
    const order=await purchaseModel.findOne({_id:id})
    res.send(order)
  }catch(err){
    console.log(err),
    res.send(err)
  }
}

const getUserOrders=async(req,res)=>{
  const {id}=req.params
  try{
    const purchaseOrders=await purchaseModel.find({user:id}).sort({createdAt:"-1"})
    res.send(purchaseOrders)
  }catch(err){
    res.send(err)
    console.log(err)
  }
}


module.exports={getVendorOrders,updateScheduleResponse,updateScheduleShipping,giveAcknowledge,orderData,getUserOrders}
  