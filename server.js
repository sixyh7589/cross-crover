const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('./'));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, tel, email, type, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'crscrv1026@gmail.com',
    subject: `[크로스 크로버] 상담 신청 - ${name}`,
    html: `
      <h3>새로운 상담 신청이 접수되었습니다</h3>
      <p><b>이름:</b> ${name}</p>
      <p><b>연락처:</b> ${tel}</p>
      <p><b>이메일:</b> ${email}</p>
      <p><b>프로젝트 유형:</b> ${type}</p>
      <p><b>문의 내용:</b> ${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: '상담 신청이 완료되었습니다!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '메일 전송에 실패했습니다.' });
  }
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});