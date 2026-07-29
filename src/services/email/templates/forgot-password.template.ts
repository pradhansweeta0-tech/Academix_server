export const forgotPasswordTemplate = (
  otp: string
) => {
  return `
  <div style="
    max-width:600px;
    margin:auto;
    font-family:Arial,sans-serif;
    background:#ffffff;
    border:1px solid #e5e7eb;
    border-radius:12px;
    overflow:hidden;
  ">

    <div style="
      background:#dc2626;
      color:white;
      padding:24px;
      text-align:center;
    ">
      <h1>Acdemix</h1>
    </div>

    <div style="padding:30px">

      <h2>Password Reset Request</h2>

      <p>
        We received a request to reset your password.
      </p>

      <div style="
        font-size:36px;
        font-weight:bold;
        text-align:center;
        letter-spacing:8px;
        padding:20px;
        margin:20px 0;
        background:#f3f4f6;
        border-radius:10px;
      ">
        ${otp}
      </div>

      <p>
        This OTP is valid for 10 minutes.
      </p>

      <p>
        If you didn't request a password reset,
        please ignore this email.
      </p>

    </div>

    <div style="
      background:#f9fafb;
      padding:20px;
      text-align:center;
      font-size:12px;
      color:#6b7280;
    ">
      © Acdemix
      <br>
      <br>
      <strong>Contact: support@nbca.co.in</strong>
    </div>

  </div>
  `;
};