runtime orchestration + dashboard foundation

git add .
git commit -m "runtime-v1.3-daemon-closed"
git push
git tag runtime-v1.3-daemon-closed
git push origin runtime-v1.3-daemon-closed

// GET /tasks
// GET /tasks/:id
// GET /tasks/status/completed
// GET /tasks/status/failed
// GET /stats