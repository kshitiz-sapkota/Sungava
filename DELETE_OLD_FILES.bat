@echo off
echo Cleaning up old files...

REM Delete old documentation files
del "DATABASE_SETUP.md" 2>nul
del "DEPLOYMENT_CHECKLIST.md" 2>nul
del "FINAL_DELIVERY.txt" 2>nul
del "HOSTING_GUIDE.md" 2>nul
del "LAYOUT_PLAN.md" 2>nul
del "PLACEHOLDERS_TO_REPLACE.txt" 2>nul
del "PROJECT_COMPLETE.md" 2>nul
del "PROJECT_SUMMARY.md" 2>nul
del "QUICK_SETUP.md" 2>nul
del "QUICK_START_GUIDE.txt" 2>nul
del "README_NEW.md" 2>nul
del "START_HERE.md" 2>nul
del "WEBSITE_GUIDE.html" 2>nul
del "WEBSITE_PREVIEW.html" 2>nul
del "index.html" 2>nul
del "script.js" 2>nul
del "styles.css" 2>nul

REM Delete old backend and frontend folders
rmdir /s /q "backend" 2>nul
rmdir /s /q "frontend" 2>nul

echo Old files deleted!
echo.
echo Now copying new files...
pause
