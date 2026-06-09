export const welcomeStudentTemplate = (
  student: {
    name: string;
    studentId: string;
    email: string;
    board: string;
    className: string;
  }
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

      <p>Dear ${student.name},</p>

      <p>
        Your account has been created successfully.
      </p>

      <table style="width:100%;margin-top:20px">
        <tr>
          <td><strong>Student ID</strong></td>
          <td>${student.studentId}</td>
        </tr>

        <tr>
          <td><strong>Email</strong></td>
          <td>${student.email}</td>
        </tr>

        <tr>
          <td><strong>Board</strong></td>
          <td>${student.board}</td>
        </tr>

        <tr>
          <td><strong>Class</strong></td>
          <td>${student.className}</td>
        </tr>
      </table>

      <p style="margin-top:25px">
        You can now log in to your NBCA account and begin learning.
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