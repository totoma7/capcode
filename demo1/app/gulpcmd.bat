REM ****************************************************************
REM --------------------------gulpcmd.bat---------------------------
REM ::S J Saha::
REM Make sure you copy this file to the WebContent folder
REM of your Fiori app project in Eclipse workspace
REM It is safe to close Eclipse while working with the files - 
REM gulpfile.js and gulpcmd.bat
REM *****************************************************************
@echo off
call npm config delete proxy
call npm config delete https-proxy
REM call npm config set proxy '<your proxy server>'
REM call npm config set https-proxy '<your proxy server>'
call npm install gulp
call npm install gulp-tap
call npm install gulp-uglify
call npm install gulp-pretty-data
call npm install fs
call npm install path
call gulp.cmd



