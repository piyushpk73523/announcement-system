# Announcement Management System

A full-stack application for managing company-wide announcements with rich text formatting.

## Prerequisites
- Node.js 
- MySQL 
- npm or yarn

## Setup Instructions

### Database Setup
1. Create MySQL database:
   ```sql
   CREATE DATABASE announcement_db;

DB_NAME=announcement_db
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
PORT=5000

## API Endpoints

| Method  | Endpoint                     | Description                      |
|---------|------------------------------|----------------------------------|
| GET     | `/api/announcements`         | Get all announcements           |
| GET     | `/api/announcements/:id`     | Get single announcement         |
| POST    | `/api/announcements`         | Create new announcement         |
| PUT     | `/api/announcements/:id`     | Update existing announcement    |
| DELETE  | `/api/announcements/:id`     | Delete announcement             |