# ConnectHub
  ConnectHub is a simple and intuitive video conferencing web application that allows users to create or join video rooms. It 
  provides features like real-time video streaming, chat functionality, and basic controls for muting/unmuting audio and 
  stopping/starting video.

# Features
  Create or Join Rooms: Users can create a new room or join an existing one by entering the Room ID.
  
  Real-time Video Communication: Connect with others using video and audio streams.
  
  Chat Functionality: Send and receive text messages in real-time while in a video conference.
  
  Basic Controls: Mute/unmute microphone, stop/start video, and leave the meeting easily.

# Installation
 Clone the repository:
 
    git clone https://github.com/samarthlonakadi193/ConnectHub.git
 Install dependencies:
  Ensure you have Node.js installed, then run:      
  
     npm install
 
 Run the server:
    Start the application by running:
    
      node server.js
 Access the application:

 Open your browser and go to http://localhost:3500.

# File Structure
    📦 ConnectHub
    ├─ public
    │  ├─ images
    │  ├─ script.js
    │  └─ style.css
    ├─ views
    │  ├─ index.ejs
    │  └─ room.ejs
    ├─ README.md
    ├─ package-lock.json
    ├─ package.json
    └─ server.js
# Technologies Used
  - Node.js: Backend server to handle HTTP requests and WebSocket connections.
  
  - Express.js: Framework for building the web server.

  - Socket.io: Library for real-time WebSocket communication.
  
  - Peer.js: WebRTC library for peer-to-peer video streaming.
  
  - EJS: Templating engine for generating HTML pages.
  
  - Bootstrap: CSS framework for styling the frontend.

# How It Works
  1) Landing Page (index.ejs):
  
      Users enter their name and optionally a Room ID.
    
      If no Room ID is provided, a new one is generated using uuidv4().
  
  2) Room Page (room.ejs):
  
      Users are redirected to a room where they can see and communicate with others.
      
      The room supports multiple participants, video streaming, and chat.
      
      Users can mute/unmute their microphone, stop/start their video, and leave the meeting.
  
  3) Server (server.js):
      
      Manages user connections using Socket.io.
      
      Handles room creation and user management.
      
      Broadcasts messages and video streams to other participants in the room.
  
  4) Client-side (script.js):
  
      Establishes a peer-to-peer connection using Peer.js.
    
      Manages video streaming and chat.
    
      Updates the UI based on user actions like muting, unmuting, and leaving the room.
