export const welcomeTeacherTemplate = (
  teacher: {
    name: string;
    email: string;
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
      <h1>Academix</h1>
      
    </div>

    <div style="padding:30px">

      <h2>Welcome to Acdemix 🎉</h2>

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
        You can now login to the Academix Teacher Portal and start managing classes, assignments, tests and resources.
      </p>
       <p> To login use your Email ID</p>
      <p>Login to https://academix-two-omega.vercel.app/login</p>

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