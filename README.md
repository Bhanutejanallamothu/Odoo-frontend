# GearGuard – Maintenance Management System

GearGuard is a modern, full-featured web application designed to streamline maintenance operations. It provides a comprehensive platform for managing equipment, tracking maintenance requests, organizing teams, and scheduling tasks, all through an intuitive and responsive user interface.

## ✨ Features

- **Interactive Dashboard**: Get an at-a-glance overview of critical maintenance metrics, including equipment health, open work orders, and technician workload.
- **Kanban-Style Request Management**: Track maintenance requests through a visual, drag-and-drop Kanban board with statuses like 'New', 'In Progress', and 'Repaired'.
- **Comprehensive Asset Management**: A complete CRUD interface for managing company equipment, including details, assignments, and maintenance history.
- **Role-Based Access Control**: Tailored user experiences for different roles (Admin, Manager, Technician, Employee) with distinct permissions and views.
- **Team & User Management**: Organize technicians and employees into maintenance teams.
- **Preventive Maintenance Calendar**: Schedule and visualize upcoming preventive maintenance tasks in a monthly calendar view.
- **Detailed Work Centers & Categories**: Group equipment by category and location-based work centers for better organization.
- **Secure Authentication**: JWT-based authentication ensures that only authorized users can access the system.

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Drag & Drop**: [dnd-kit](https://dndkit.com/)

### Backend

- **Framework**: [Express.js](https://expressjs.com/)
- **Authentication**: JSON Web Tokens (JWT)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- An instance of the corresponding GearGuard Express backend running.

### Frontend Setup

1.  **Clone the repository** (if applicable)

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    The frontend is configured to connect to a backend server running at `http://localhost:5050`. This is set in `src/lib/api-client.ts`. No `.env` file is required for this default setup.

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

## 📂 Project Structure

```
/src
├── app/                  # Next.js App Router: pages and layouts
│   ├── (app)/            # Authenticated routes with shared layout
│   ├── api/              # (Legacy) Mock API routes
│   ├── login/            # Login page
│   └── register/         # Registration page
├── components/           # Reusable UI components
│   ├── app/              # Application-specific components (e.g., Header, Calendar)
│   └── ui/               # Generic ShadCN UI components
├── hooks/                # Custom React hooks (e.g., useToast)
├── lib/                  # Core application logic and utilities
│   ├── api/              # Functions for making API calls to the backend
│   ├── api-client.ts     # Centralized fetch wrapper for backend communication
│   └── types.ts          # TypeScript type definitions
└── ...
```

## 🔐 Authentication

Authentication is handled via JWT.

-   **Login**: Users submit their credentials to `/api/auth/login`. On success, a JWT is returned and stored in the browser's `localStorage`.
-   **API Requests**: The central API client in `src/lib/api-client.ts` automatically attaches the JWT as an `Authorization: Bearer <token>` header to all subsequent requests to protected endpoints.
