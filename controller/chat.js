// controllers/chatController.js
const Message = require('../model/chat');
const Vendor = require('../model/vendor');
const Customer = require('../model/customer');
const User = require('../model/user');

exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  const sender = await Customer.findById(senderId);
  const receiver = await Vendor.findById(receiverId);

  if (!sender || !receiver) {
    return res.status(404).send("Sender or receiver not found");
  }

  const newMessage = new Message({
    sender: sender._id,
    senderModel: 'Customer',
    receiver: receiver._id,
    receiverModel: 'Vendor',
    message,
  });

  await newMessage.save();
  res.status(201).send(newMessage);
};

exports.getMessages = async (req, res) => {
  const { user1Id, user1Model, user2Id, user2Model } = req.query;

  const messages = await Message.find({
    $or: [
      { sender: user1Id, senderModel: user1Model, receiver: user2Id, receiverModel: user2Model },
      { sender: user2Id, senderModel: user2Model, receiver: user1Id, receiverModel: user1Model }
    ]
  }).sort({ createdAt: 1 });

  res.send(messages);
};

exports.adminSendMessage = async (req, res) => {
  const { senderId, senderModel, receiverId, receiverModel, message } = req.body;

  const sender = await User.findById(senderId);
  const receiver = await (receiverModel === 'Vendor' ? Vendor : Customer).findById(receiverId);

  if (!sender || !receiver) {
    return res.status(404).send("Sender or receiver not found");
  }

  const newMessage = new Message({
    sender: sender._id,
    senderModel,
    receiver: receiver._id,
    receiverModel,
    message,
  });

  await newMessage.save();
  res.status(201).send(newMessage);
};
