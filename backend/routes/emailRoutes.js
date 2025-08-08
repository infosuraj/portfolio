const express = require("express");
const nodemailer = require("nodemailer");
const nodeFetch = require("node-fetch").default || require("node-fetch"); 
const crypto = require("crypto");
const { getAutoReplyTemplate, getAdminNotificationTemplate } = require("../utils/emailTemplate");
require("dotenv").config();

module.exports = () => {
  const router = express.Router();

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.verify((err, success) => {
    if (err) {
      console.error("Nodemailer verification error:", err);
    } else {
      console.log("Nodemailer is ready to send mail");
    }
  });

  router.post("/send-support", async (req, res) => {
    const {
      name,
      email,
      phone,
      companyName,
      website,
      interest,
      budget,
      timeline,
      message,
    } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Name, email, and message are required.",
        });
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact from ${name}`,
        html: getAdminNotificationTemplate({
          name,
          email,
          phone,
          companyName,
          website,
          interest,
          budget,
          timeline,
          message,
        }),
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thank you for getting in touch",
        html: getAutoReplyTemplate({ name, email, message }),
      });

      res
        .status(200)
        .json({ success: true, message: "Support message sent successfully!" });
    } catch (error) {
      console.error("Email sending failed:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Something went wrong. Please try again later.",
        });
    }
  });

  router.post("/subscribe", async (req, res) => {
    const { email, firstName } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required to subscribe." });
    }

    try {
      const mailchimpBody = {
        email_address: email,
        status: "subscribed",
      };

      if (firstName) {
        mailchimpBody.merge_fields = {
          FNAME: firstName,
        };
      }

      const response = await nodeFetch(
        `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members/`,
        {
          method: "POST",
          headers: {
            Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mailchimpBody), // Send the prepared body
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.title === "Member Exists" || (errorData.detail && errorData.detail.includes("is already a list member"))) {
          return res.status(200).json({ success: true, message: "You are already subscribed to the newsletter!" });
        }
        throw new Error(errorData.detail || "Subscription failed");
      }

      res
        .status(200)
        .json({ success: true, message: "Subscribed successfully!" });
    } catch (error) {
      console.error("Mailchimp subscription error:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Failed to subscribe. Please try again later.",
        });
    }
  });

  router.post("/unsubscribe", async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required to unsubscribe." });
    }

    try {
      const subscriberHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');

      const response = await nodeFetch(
        `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members/${subscriberHash}`,
        {
          method: "PUT", // Use PUT to update an existing member
          headers: {
            Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "unsubscribed", // Set status to unsubscribed
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 404 && errorData.title === "Resource Not Found") {
            return res.status(200).json({ success: true, message: "Email not found on list, likely already unsubscribed." });
        }
        throw new Error(errorData.detail || "Unsubscribe failed");
      }

      res
        .status(200)
        .json({ success: true, message: "Unsubscribed successfully!" });
    } catch (error) {
      console.error("Mailchimp unsubscribe error:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Failed to unsubscribe. Please try again later.",
        });
    }
  });

  return router;
};
