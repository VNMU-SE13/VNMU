// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Cấu hình CORS để cho phép yêu cầu từ front-end
app.use(cors());
app.use(express.json());

// Định nghĩa một API đơn giản
app.get('/api', (req, res) => {
  res.send({ message: 'Hello from the back-end!' });
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
