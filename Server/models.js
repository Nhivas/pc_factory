// models/index.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  phone: String,
  address: String
});

const CPUSchema = new mongoose.Schema({
  name: String,
  model: String,
  generation: Number,
  price: Number,
  specs: String
});

const RAMSchema = new mongoose.Schema({
  name: String,
  ddr: Number,
  price: Number
});

const GPUSchema = new mongoose.Schema({
  name: String,
  spec: String,
  price: Number
});

const MotherboardSchema = new mongoose.Schema({
  name: String,
  price: Number,
  cpu_compatibility: [{ processor: String, generation: Number }],
  ddr: Number
});

const SSDSchema = new mongoose.Schema({
  name: String,
  price: Number,
  size: Number
});

const CoolerSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const CabinetSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const PowerSupplySchema = new mongoose.Schema({
  name: String,
  watt: Number,
  price: Number
});

const PCSchema = new mongoose.Schema({
  cpu: { type: mongoose.Schema.Types.ObjectId, ref: 'CPU' },
  motherboard: { type: mongoose.Schema.Types.ObjectId, ref: 'Motherboard' },
  ram: { type: mongoose.Schema.Types.ObjectId, ref: 'RAM' },
  gpu: { type: mongoose.Schema.Types.ObjectId, ref: 'GPU' },
  cooler: { type: mongoose.Schema.Types.ObjectId, ref: 'Cooler' },
  ssd: { type: mongoose.Schema.Types.ObjectId, ref: 'SSD' },
  cabinet: { type: mongoose.Schema.Types.ObjectId, ref: 'Cabinet' },
  smps: { type: mongoose.Schema.Types.ObjectId, ref: 'PowerSupply' },
  price: Number,
  purpose: { type: String, enum: ['editing', 'gaming', 'basic'] },
  ordered_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  order_status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
});

const User = mongoose.model('User', UserSchema);
const CPU = mongoose.model('CPU', CPUSchema);
const RAM = mongoose.model('RAM', RAMSchema);
const GPU = mongoose.model('GPU', GPUSchema);
const Motherboard = mongoose.model('Motherboard', MotherboardSchema);
const SSD = mongoose.model('SSD', SSDSchema);
const Cooler = mongoose.model('Cooler', CoolerSchema);
const Cabinet = mongoose.model('Cabinet', CabinetSchema);
const PowerSupply = mongoose.model('PowerSupply', PowerSupplySchema);
const PC = mongoose.model('PC', PCSchema);

module.exports = { User, CPU, RAM, GPU, Motherboard, SSD, Cooler, Cabinet, PowerSupply, PC };
