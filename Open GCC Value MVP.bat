@echo off
REM Windows launcher for the GCC Value MVP Framework.
REM Double-click this file. Requires Python 3 to be installed and on PATH.
cd /d "%~dp0"
python serve.py
if errorlevel 1 (
  py serve.py
)
pause
