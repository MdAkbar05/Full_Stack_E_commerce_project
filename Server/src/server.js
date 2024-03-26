const app = require("./app");
const connectDB = require("./config/dbConnect");
const { serverPort } = require("./secret");
app.listen(serverPort, async () => {
  console.log(`Server is running at http://localhost:${serverPort}`);
  await connectDB();
});
