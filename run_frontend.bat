@echo off
echo ====================================================
echo Starting EduTrack Pro React Frontend (Port 5173)...
echo ====================================================
cd /d "%~dp0frontend"
npm.cmd run dev
pause
