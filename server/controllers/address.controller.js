import  Address  from '../models/address.model.js';
export const addAddressController = async(req, res) => {
  try {
    const {  address } = req.body;
    let userId = req.user.id
    await Address.create({  ...address, userId });
    // Logic to add address for the user
    res.status(201).json({
        success: true,
         message: 'Address added successfully',});
    
  } catch (error) {
    res.status(500).json({ success: false, message:  error.message });
    
  }

};

export const getAddressesController = async(req, res) => {
    try {
        let userId = req.user.id
        const addresses = await Address.find({ userId });
        res.status(200).json({ success: true, addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};