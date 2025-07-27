require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const announcementRoutes = require("./routes/announcements");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/announcements", announcementRoutes);

// Sync database and start server
sequelize
  .sync({ alter: true })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database sync error:", err);
    process.exit(1); // Exit if database connection fails
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
});
