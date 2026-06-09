"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testEmailController = void 0;
const email_service_1 = require("../../services/email/email.service");
const testEmailController = async (req, res) => {
    await (0, email_service_1.sendEmail)(req.body.email, "NBCA Test Email", `
      <h1>NBCA Email Working 🚀</h1>
      <p>Your email service is configured correctly.</p>
      `);
    res.json({
        success: true,
        message: "Email sent",
    });
};
exports.testEmailController = testEmailController;
