import dotenv from "dotenv";
dotenv.config();
import createServer from "./app.controller.js";
const serverPort = process.env.SERVER_PORT;
createServer().listen(serverPort, () => {
    console.log("✅ STATUS IN SERVER : PASSED ");
    console.log(`✅ SERVER IS RUNNING ON PORT : ${serverPort}`);
});
