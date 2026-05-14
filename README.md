

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
The first 2 screenshots show the admin dashboard view and the different clients registered under Sentra (Platform Lead)
<img width="1872" height="904" alt="Screenshot 2026-05-14 141404" src="https://github.com/user-attachments/assets/b951b4f2-58f6-4694-be02-15654d741b26" />
<img width="1835" height="867" alt="image" src="https://github.com/user-attachments/assets/ed65fb12-f406-4e31-a7d3-c4052638c4b9" />
The other 2 screenshots that follow show the client dashboard view and the campaigns they have created, or campaigns that the admin has created on their behalf 
(Marketing Client)
<img width="1868" height="850" alt="Screenshot 2026-05-14 141922" src="https://github.com/user-attachments/assets/33860606-984d-46cb-88f9-9d026ce1da82" />
<img width="1891" height="866" alt="Screenshot 2026-05-14 141944" src="https://github.com/user-attachments/assets/ffb9fd26-39ff-423a-b002-7680148c8c5b" />
The last 2 screenshots show the AI analysis generated for a campaign 
<img width="1541" height="860" alt="Screenshot 2026-05-14 142004" src="https://github.com/user-attachments/assets/7475673e-d67b-41ff-9b6f-b339203bf2bd" />
<img width="1392" height="823" alt="Screenshot 2026-05-14 142119" src="https://github.com/user-attachments/assets/bb4b6c73-1f68-4c3e-8dfa-7d32f9ef4dd0" />



## Installation

```bash
git clone https://github.com/wlexie/sentra-app.git

cd sentra-app

npm install

npm run dev
```
