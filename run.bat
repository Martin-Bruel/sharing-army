del "back\mocks\*.*" /Y
Xcopy "mocks\*.*" "back\mocks\" /K /D /H /Y
cd back
start cmd /K npm run dev
cd../front
start cmd /K ng serve
start code
start "" http://localhost:4200/
exit