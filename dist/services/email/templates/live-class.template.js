"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveClassTemplate = void 0;
const liveClassTemplate = (studentName, classTitle, subjectName, teacherName, meetingLink, startTime) => {
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
exports.liveClassTemplate = liveClassTemplate;
