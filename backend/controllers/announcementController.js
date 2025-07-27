const Announcement = require("../models/Announcement");
const { Op } = require("sequelize");

exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findByPk(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }
    const announcement = await Announcement.create(req.body);
    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByPk(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    await announcement.update(req.body);
    res.json(announcement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByPk(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    await announcement.destroy();
    res.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchAnnouncements = async (req, res) => {
  try {
    const { q } = req.query;
    const announcements = await Announcement.findAll({
      where: {
        title: {
          [Op.like]: `%${q}%`,
        },
      },
    });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
