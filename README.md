# Construction Project Management System

A modern React.js frontend for a Construction Project Management System with role-based access control and Kanban-style task management.

## Features

- **Role-based access control** for Admin, Owner, Engineer, and Contractor
- **Modern UI** with Material UI components
- **Kanban-style task boards** for project management
- **Responsive design** for desktop and mobile
- **State management** with Redux
- **Routing** with React Router

## Pages

### Shared Pages
- Login
- Registration with user type selection

### Admin Pages
- Dashboard with statistics and activity logs
- User management
- Activity logs
- Settings

### Owner Pages
- Dashboard with project summary
- Projects list and detailed view
- Kanban task board
- Invitations management
- Reviews
- Notifications
- Settings

### Engineer Pages
- Dashboard with assigned tasks
- Tasks list and details
- Projects view
- Reports management
- Notifications
- Settings

### Contractor Pages
- Dashboard with current tasks
- Tasks list and details
- Projects view
- Reports submission
- Invitations management
- Notifications
- Settings

## Technology Stack

- React 18
- TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Material UI for components
- Axios for API communication

## Project Structure

```
src/
├── components/
│   ├── forms/
│   ├── kanban/
│   ├── layout/
│   └── ui/
├── pages/
│   ├── admin/
│   ├── contractor/
│   ├── engineer/
│   ├── owner/
│   └── shared/
├── store/
│   ├── slices/
│   └── index.ts
├── App.tsx
├── AppRouter.tsx
└── index.tsx
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Backend Integration

This frontend is designed to connect to a Laravel RESTful API backend. The API endpoints should follow RESTful conventions for:

- Authentication (login, register, logout)
- Projects CRUD operations
- Tasks management
- User management
- Invitations
- Notifications
- Reports

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## Future Enhancements

- Real-time notifications with WebSockets
- File upload for project documents
- Calendar view for project timelines
- Mobile app with React Native
