# Redbarry Online Courses Platform

This project is a React-based web application for an online learning platform where users can browse, explore, and enroll in educational courses.

## Features

### Authentication
- User registration and login via modal windows
- Authentication state affects navigation and available actions

### Dashboard
- Displays:
  - Featured courses
  - Courses currently in progress

### Course Catalog
- Paginated list of courses
- Sidebar filters for refining results
- order by sort of the page

### Course Details Page
- Detailed course information:
  - Price
  - Image
  - Duration
  - Instructor
  - Description
- Schedule selection system
- Ability to enroll in a course

### Enrolled Courses Sidebar
- Displays a list of courses the user is enrolled in
- Accessible via navigation

### User Profile Modal
- Contains user information:
  - Phone number
  - Email
  - Age
  - Avatar
- Profile completion is required before enrolling in courses
- Opens from the profile section in the navbar

## Navigation

### For Unauthorized Users
- Logo → Redirects to Dashboard
- Browse Courses → Opens course catalog
- Log In → Opens login modal
- Sign Up → Opens registration modal

### For Authorized Users
- Logo → Redirects to Dashboard
- Browse Courses → Opens course catalog
- Enrolled Courses → Opens sidebar panel
- Profile Icon → Opens profile modal/page

## Tech Stack

- React (Create React App)
- React Router DOM v5

## Requirements

- required to have npm to install react
- .env file to have functional api and access to backend

## Installation

```bash
npx create-react-app .
npm install react-router-dom@5
```

## Project Structure

```
src/
│
├── assets/
│   ├── icons/
│   │   ├── filters/
│   │   ├── schedule/
│   │   ├── social-media/
│   │   └── steps/
│   └── imgs/
│
├── components/
├── helpers/
├── pages/
├── services/
│   └── api.js
│
├── styles/
│
├── app.js
├── index.js
└── reportWebVitals.js
```

## Functionality Overview

- Modular component-based architecture
- Routing handled with react-router-dom
- API communication abstracted in services/api.js