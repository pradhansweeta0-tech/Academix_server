
export const otpEmailTemplate = (
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
      background:#4d86ff;
      color:white;
      padding:24px;
      text-align:center;
    ">
    <div>
      <h1>Academix</h1>
      </div>
    </div>

    <div style="padding:30px">

      <h2>Email Verification</h2>

      <p>
        Use the verification code below
        to complete your registration.
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
        This OTP will expire in
        <strong>10 minutes</strong>.
      </p>

      <p>
        If you did not request this
        verification code, you can
        safely ignore this email.
      </p>

    </div>

    <div style="
      background:#f9fafb;
      padding:20px;
      text-align:center;
      font-size:12px;
      color:#6b7280;
    ">
      © Academix
      <br>
      <br>
      <strong>Contact: support@nbca.co.in</strong>
    </div>

  </div>
  `;
};