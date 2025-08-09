# [project Name :TurmoilOS] 🎯


## Basic Details
### Team Name: 404


### Team Members
- Team Lead: [SooryaAP] - [Cochin University College of Engineering Kuttanad]
- Member 2: [VyshnavPradeep] - [Cochin University College of Engineering Kuttanad]


### Project Description

The Project is named as a Turmoil OS an operating system which pranks the users
by annoying functionalities and features.
This project is a cross-platform desktop application built using Electron.js.  
It uses standard web technologies (HTML, CSS, JavaScript) for the user interface while leveraging Node.js for backend logic.  
The app structure follows Electron’s separation of processes:
- Main Process (application lifecycle control)
- Renderer Process (UI rendering and user interaction)
- Preload Script (secure communication bridge)
Build scripts for Windows and Linux/macOS automate packaging into installable files.

### The Problem (that doesn't exist)
There are no OS for pranking the users in a funny way and to serve as a refreshment to escape the boredom

### The Solution (that nobody asked for)
The project will serve it's purpose as it l]kills the boredom of the user and annoys him in afunny way

## Technical Details
### Technologies/Components Used
📦 Technology Stack:
- Framework: Electron.js
- Frontend: HTML (UI layout), CSS (styling), JavaScript (interaction logic)
- Backend: Node.js APIs in Electron main process
- Scripts: 
  - build.bat (Windows build automation)
  - build.sh (Linux/macOS build automation)
- Package Management: npm (package.json, package-lock.json)

🧩 Core Components:
1. main.js:
   - Initializes the app
   - Creates main window
   - Handles lifecycle events (open, close, quit)
2. preload.js:
   - Secure API bridge between frontend and backend
   - Runs before renderer loads
3. uselessos.html:
   - Defines UI structure
4. uselessos.css:
   - Styles the UI
5. uselessos.js:
   - Handles frontend events and UI logic
6. build.bat / build.sh:
   - Packages the application for release

⚙ Application Flow:
1. npm start → Electron starts main process
2. main.js creates app window → loads uselessos.html
3. preload.js injects APIs
4. Renderer process runs uselessos.js for interactivity
5. User interacts → renderer updates UI or calls backend
6. build scripts package for OS-specific distribution
### Implementation

# Installation
npm install

# Run
npm start

### Project Documentation
For Software:

# Screenshots (Add at least 3)
<img width="1838" height="893" alt="image" src="https://github.com/user-attachments/assets/d3851eb0-93c8-46d4-ad0e-c4c0f0a3e735" />
<img width="1919" height="1022" alt="image" src="https://github.com/user-attachments/assets/f61675f3-2e77-459a-a293-1e1ebd4c905d" />
<img width="1819" height="869" alt="image" src="https://github.com/user-attachments/assets/6065f32d-279d-44e4-81c1-7265e2a9c3f2" />
<img width="1919" height="1016" alt="image" src="https://github.com/user-attachments/assets/a0c959c0-983d-4cb4-b73d-f64fee70b342" />
<img width="1915" height="1013" alt="image" src="https://github.com/user-attachments/assets/127683fb-f123-4a4a-b1f2-8db2d4ce6098" />
<img width="1919" height="961" alt="image" src="https://github.com/user-attachments/assets/542b62f4-72e9-478f-8f54-a7367533c8bd" />
<img width="1912" height="970" alt="image" src="https://github.com/user-attachments/assets/406f933c-3573-4b9a-bc49-48ed0afd7270" />
<img width="1913" height="1015" alt="image" src="https://github.com/user-attachments/assets/ded8d6af-f72e-40b1-abc4-c3e5be5709e0" />





# Diagrams
<img width="842" height="810" alt="image" src="https://github.com/user-attachments/assets/6de89fd1-ffd1-464f-821a-2ef8fe3be5df" />




## Team Contributions
  
   Soorya AP [LEAD] - development and creation of bat and shell script
   VyshnavPradeep   - contributed to the development of the structure and overall development of GUI

## project URL(URL IF OF PROJECT REPOSITORY BECAUSE THE PROJECT IS AN OPERATING SYSTEM TO BE RUN IN THE LOCAL MACHINE NOT LIKELY TO BE DEPLOYED IN THE WEB)

"https://github.com/VYSHNAVPRADEEP2004/uselessproject"
