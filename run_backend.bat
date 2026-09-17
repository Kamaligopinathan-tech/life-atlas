@echo off
echo ====================================================
echo Starting EduTrack Pro Django Backend (Port 8000)...
echo ====================================================
cd /d "%~dp0backend"
"..\.venv\Scripts\python.exe" manage.py runserver 0.0.0.0:8000
pause
