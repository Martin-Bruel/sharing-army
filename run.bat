del "back\mocks\*.*" /Y
Xcopy "mocks\*.*" "back\mocks\" /K /D /H /Y
cd back
start cmd /K npm run dev
cd../front
start cmd /K set GOOGLE_APPLICATION_CREDENTIALS=My First Project-f173b178df81.json
start cmd /K ng serve
start code
exit