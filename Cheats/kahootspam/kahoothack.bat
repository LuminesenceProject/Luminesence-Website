@ECHO Off

ECHO do you want to lauch Kahoot Hack?
set /p input=
if %INPUT%== yes goto BEGIN
if %INPUT%== no goto END
pause

:BEGIN
start index.js "C:\index.js" /C
if not errorlevel 1 goto END>nul
goto RETRY>nul


:RETRY
echo msgbox"An error has happened. Files might be missing, or commands may have been blocked. It is likely not your fault." > %tmp%\tmp.vbs
del %tmp%\tmp.vbs
pause
goto BEGIN


:END
ECHO Tab is being closed.
exit




 

