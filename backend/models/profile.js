const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const breadcrumbSchema = new mongoose.Schema({
  title: { type: String, required: false },
  subtitle: { type: String, required: false },
  subheading: { type: String, required: false },
});

const serviceItemSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: true }, 
});

const servicesSchema = new mongoose.Schema({
  title: { type: String, required: false },
  subtitle: { type: String, required: false },
  serviceItem: { type: [serviceItemSchema], default: [] }
});

const socialSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Link: { type: String, required: true },
    Icon: { type: String, required: true }
});

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  socials: {type: [socialSchema], default: []},
  address: { type: String, required: true },
  profileImage: { type: String, required: true }, 
  logoLight: { type: String, required: true },
  logoDark: { type: String, required: true },
  banner: { type: String, required: true },
  breadcrumb: { type: [breadcrumbSchema], default: [] },
  services: { type: [servicesSchema], default: [] },
  faqs: { type: [faqSchema], default: [] },
  resume: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);