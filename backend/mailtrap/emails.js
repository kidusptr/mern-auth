import { mailtrapClient, sender } from "../config/mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "../mailtrap/emailTemplates.js";
export const sendVerificationEmail = async (email, verificationCode) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationCode
      ),
      category: "Email Verification",
    });

    console.log("Email sent:", response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const welcomeEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to our platform",
      html: "<h1>Welcome to our platform</h1>",
      category: "Welcome Email",
    });
    console.log("Email sent:", response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
