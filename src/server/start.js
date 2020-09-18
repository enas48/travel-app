const app = require('./server.js');
// designates what port the app will listen to for incoming requests
const port=process.env.PORT||3000;
const server = app.listen(port, () => {
  console.log(`server is running on localhost:3000`);
});
