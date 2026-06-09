"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeTeacherTemplate = void 0;
const welcomeTeacherTemplate = (teacher) => {
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
      background:#2563eb;
      color:white;
      padding:24px;
      text-align:center;
    ">
      <h1>NBCA</h1>
      <p>North Bengal Cloud Academy</p>
    </div>

    <div style="padding:30px">

      <h2>Welcome to NBCA 🎉</h2>

      <p>Dear ${teacher.name},</p>

      <p>
        Your teacher account has been created successfully.
      </p>

      <table style="width:100%;margin-top:20px">
        <tr>
          <td><strong>Name</strong></td>
          <td>${teacher.name}</td>
        </tr>

        <tr>
          <td><strong>Email</strong></td>
          <td>${teacher.email}</td>
        </tr>

        <tr>
          <td><strong>Role</strong></td>
          <td>Teacher</td>
        </tr>
      </table>

      <p style="margin-top:25px">
        You can now login to the NBCA Teacher Portal and start managing classes, assignments, tests and resources.
      </p>
      <p>Login to https://nbca.co.in</p>

    </div>

    <div style="
      background:#f9fafb;
      padding:20px;
      text-align:center;
      font-size:12px;
      color:#6b7280;
    ">
      © NBCA • North Bengal Cloud Academy
      <br>
      <br>
      <strong>Contact: support@nbca.co.in</strong>
    </div>

  </div>
  `;
};
exports.welcomeTeacherTemplate = welcomeTeacherTemplate;
