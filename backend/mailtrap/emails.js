import { mailtrapClient, sender } from "../config/mailtrap.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "../mailtrap/emailTemplates.js";
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

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "d2fba4ad-4480-4d75-b458-b9ab7ca7ae4e",
      template_variables: {
        company_info_name: "MY Project",
        name: name,
        company_info_address: "Bole",
        company_info_city: "Addis Ababa",
        company_info_zip_code: "0000",
        company_info_country: "Ethiopia",
      },
    });

    console.log("Email sent:", response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
    console.log("Email sent:", response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const sendPasswordResetSuccessEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{name}", name),
      category: "Password Reset",
    });
    console.log("Email sent:", response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
