# Cats Full-Stack App

This is a full-stack application for managing cat breeds. It includes a React frontend and a Node.js backend with a RESTful API.

## Features

- View a list of cat breeds
- Add a new cat breed
- Edit details of an existing cat breed
- Delete a cat breed

## Technologies Used

- React
- TypeScript
- Styled Components
- Node.js
- Express

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn

### API Endpoints

GET /api/cat-breeds - Get all cat breeds
POST /api/cat-breeds - Add a new cat breed
PUT /api/cat-breeds/:id - Update a cat breed
DELETE /api/cat-breeds/:id - Delete a cat breed

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/cats-full-stack-app.git
cd cats-full-stack-app

# Install client dependencies
npm install
npm run dev

# Install server dependencies
cd api
npm install
npm run start
