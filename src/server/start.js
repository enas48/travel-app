const app = require('./server.js');
// designates what port the app will listen to for incoming requests
const port=process.env.PORT||3000||'https://5f67683acf3151000708562f--kind-shaw-0432f0.netlify.app/';
const server = app.listen(port, () => {
  console.log(`server is running on localhost:3000`);
});
