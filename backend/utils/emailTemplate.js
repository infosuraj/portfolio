const getAutoReplyTemplate = ({ name, email, message }) => {
  const LOGO_URL =
    "https://ik.imagekit.io/tr:w-800,q-100,fo-auto/upzxi2yzb/profile/main-logo-email.png";
  const BANNER_URL =
    "https://ik.imagekit.io/upzxi2yzb/tr:w-800,q-100,fo-auto/Mail%20Subscribe%20Assets/email-banner.png";
  const BRAND_COLOR = "#007bff";
  const NOTIFICATION_ICON_URL =
    "https://ik.imagekit.io/upzxi2yzb/tr:w-50,q-80,fo-auto/Mail%20Subscribe%20Assets/ktcvml64rklcd0tiigpg.png";
  const CANCEL_BELL_ICON_URL =
    "https://ik.imagekit.io/upzxi2yzb/tr:w-50,q-80,fo-auto/Mail%20Subscribe%20Assets/w8eutv6bbtoafj80u7fj.png";
  const INSTAGRAM_URL = "https://www.instagram.com/infosuraj_/";
  const LINKEDIN_URL = "https://www.linkedin.com/in/infosuraj/";
  const WEBSITE_URL = "https://infosuraj.com/";
  const SUPPORT_EMAIL = "support@infosuraj.com";
  const SUBSCRIBE_URL = `${WEBSITE_URL}subscribe?email=${encodeURIComponent(
    email || ""
  )}`;
  const UNSUBSCRIBE_URL = `${WEBSITE_URL}unsubscribe?email=${encodeURIComponent(
    email || ""
  )}`;
  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
        <!-- Header with Logo on Left and Subscribe/Unsubscribe Icons on Right (Table-based for compatibility) -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8F8F8; border-bottom: 1px solid #eeeeee;">
            <tr>
                <td style="padding: 15px 0px 15px 25px; text-align: left; vertical-align: middle;">
                    <!-- Logo on the left -->
                    <a href="${WEBSITE_URL}" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
                        <img src="${LOGO_URL}" alt="infosuraj Logo" style="max-width: 50px; height: auto; display: block; vertical-align: middle;">
                    </a>
                </td>
                <td style="padding: 15px 25px 15px 0px; text-align: right; vertical-align: middle;">
                    <!-- Subscribe and Unsubscribe Icons on the right -->
                    <a href="${SUBSCRIBE_URL}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-left: 15px;">
                        <img src="${NOTIFICATION_ICON_URL}" alt="Subscribe" style="width: 24px; height: 24px; vertical-align: middle;">
                    </a>
                    <a href="${UNSUBSCRIBE_URL}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-left: 15px;">
                        <img src="${CANCEL_BELL_ICON_URL}" alt="Unsubscribe" style="width: 24px; height: 24px; vertical-align: middle;">
                    </a>
                </td>
            </tr>
        </table>
        <!-- Banner -->
        <div style="text-align: center; line-height: 0;">
            <img src="${BANNER_URL}" alt="Welcome Banner" style="width: 100%; height: auto; display: block;">
        </div>
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; line-height: 1.6; color: #333333;">Hi ${name},</p>
            <p style="font-size: 16px; line-height: 1.6; color: #333333;">Thanks for reaching out! I’ve received your message and will respond within <strong>1–2 business days</strong>.</p>
            <p style="font-size: 16px; line-height: 1.6; color: #333333; margin-top: 25px;"><strong>Here’s what you shared:</strong></p>
            <ul style="list-style-type: none; padding: 0; margin: 15px 0;">
                <li style="margin-bottom: 10px; font-size: 16px; color: #555555;">
                    <strong>Your Message:</strong> "<em style="color: #666666;">${message}</em>"
                </li>
            </ul>
            <p style="font-size: 16px; line-height: 1.6; color: #333333; margin-top: 30px;">Talk soon,<br/>
            <strong style="color: #333333;">— Suraj Kumar</strong><br/>
            <a href="mailto:${SUPPORT_EMAIL}" style="color: #333333; text-decoration: none; font-size: 14px;">${SUPPORT_EMAIL}</a>
            </p>
        </div>
        <!-- Footer -->
        <div style="background-color: #F8F8F8; padding: 20px; text-align: center; border-top: 1px solid #eeeeee; font-size: 12px; color: #777777;">
            <!-- Subscribe Button/Link -->
            <div style="margin-bottom: 20px;">
                <a href="${SUBSCRIBE_URL}" style="display: inline-block; padding: 10px 20px; background-color: #333333; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 14px; font-weight: bold;">
                    Subscribe to my Newsletter
                </a>
            </div>
            <!-- Social Media Links -->
            <div style="margin-top: 15px; margin-bottom: 15px;">
                <a href="${INSTAGRAM_URL}" style="color: #333333; text-decoration: none; margin: 0 8px;">Instagram</a> |
                <a href="${LINKEDIN_URL}" style="color: #333333; text-decoration: none; margin: 0 8px;">LinkedIn</a>
                <!-- Add more social media links as needed -->
            </div>
            <!-- Website Link -->
            <div style="margin-bottom: 20px;">
                <a href="${WEBSITE_URL}" style="color: #333333; text-decoration: none; font-size: 14px;">Visit My Website</a>
            </div>
            <hr style="border: 0; height: 1px; background-color: #dddddd; margin: 20px auto;">
            <small style="display: block;">You’re receiving this confirmation because you contacted me via my website.</small>
        </div>
    </div>
  `;
};
const getAdminNotificationTemplate = ({
  name,
  email,
  phone,
  companyName,
  website,
  interest,
  budget,
  timeline,
  message,
}) => {
  return `
    <h3>New Contact Inquiry</h3>
    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Phone:</strong> ${phone || "N/A"}</li>
      <li><strong>Company:</strong> ${companyName || "N/A"}</li>
      <li><strong>Website:</strong> ${website || "N/A"}</li>
      <li><strong>Interest:</strong> ${interest || "N/A"}</li>
      <li><strong>Budget:</strong> ${budget || "N/A"}</li>
      <li><strong>Timeline:</strong> ${timeline || "N/A"}</li>
    </ul>
    <h4>Message:</h4>
    <p>${message}</p>
  `;
};
module.exports = {
  getAutoReplyTemplate,
  getAdminNotificationTemplate,
};
