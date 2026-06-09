export const liveClassTemplate = (
  studentName: string,
  classTitle: string,
  subjectName: string,
  teacherName: string,
  meetingLink: string,
  startTime: Date,
) => {
  return `
    <h2>New Live Class Scheduled</h2>

    <p>Hello ${studentName},</p>

    <p>A new live class has been scheduled.</p>

    <ul>
      <li><strong>Title:</strong> ${classTitle}</li>
      <li><strong>Subject:</strong> ${subjectName}</li>
      <li><strong>Teacher:</strong> ${teacherName}</li>
      <li><strong>Start Time:</strong> ${startTime}</li>
    </ul>

    <p>
      <a href="${meetingLink}">
        Join Live Class
      </a>
    </p>

    <p>
      Best Regards,<br/>
      NBCA Team
    </p>
  `;
};