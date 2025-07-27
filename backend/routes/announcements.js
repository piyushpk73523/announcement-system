const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");

router.get("/", announcementController.getAllAnnouncements);
router.post("/", announcementController.createAnnouncement);
router.get("/:id", announcementController.getAnnouncementById);
router.put("/:id", announcementController.updateAnnouncement);
router.delete("/:id", announcementController.deleteAnnouncement);
router.get("/search", announcementController.searchAnnouncements);

module.exports = router;
