# Sentra

High-precision marketing campaign management platform built with React, TypeScript, Firebase, and Gemini AI.

## Features

- Real-time campaign dashboards
- AI-powered campaign analysis using Gemini API
- Role-Based Access Control (RBAC)
- Live Firestore synchronization
- Responsive admin/client dashboards
- Tailwind + Framer Motion UI

## Tech Stack

- React
- TypeScript
- Firebase / Firestore
- Vite
- Tailwind CSS
- Framer Motion
- Google Gemini API

## AI Integration

Sentra includes a "Campaign Architect" feature powered by Gemini AI.  
The system analyzes:

- Campaign budget
- Audience targeting
- Objectives
- Strategic feasibility

and generates automated campaign summaries before approval workflows begin.

## RBAC & Security

The platform uses Firebase Authentication and Firestore Security Rules to enforce role separation between:

- Admins
- Clients

Clients can only access their own campaign data while admins maintain full oversight capabilities.

## Screenshots

## Installation

```bash
git clone https://github.com/wlexie/sentra-app.git

cd sentra-app

npm install

npm run dev
```
