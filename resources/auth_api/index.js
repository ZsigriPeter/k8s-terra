import express from "express"
import { networkInterfaces } from "os";

const app = express()

app.use(express.json())

let IP_START = process.env.IP_START

if (IP_START == undefined) {
  IP_START = "192.168"
}

function getLocalIP() {
  const interfaces = networkInterfaces();
  for (const ifaceName of Object.keys(interfaces)) {
    const iface = interfaces[ifaceName];
    for (const alias of iface) {
      if (alias.family === "IPv4" && !alias.internal && alias.address.startsWith(IP_START)) {
        return alias.address;
      }
    }
  }
  throw new Error("No local network IP found");
}

function authenticate() {
    const random = Math.random();
    if (random < 0.75) {
        return true;
    } else {
        return false;
    }
}

const state = {
    authenticate: true,
    IP_ADDR: getLocalIP()
}
 

app.get("/api/auth", (req, res) => {
    let isSuccess = authenticate()
    isSuccess ? res.status(200).json({IP_ADDR: state.IP_ADDR, success: isSuccess}) : res.status(401).json({IP_ADDR: state.IP_ADDR, success: isSuccess})
})

app.listen(8080, () => {
    console.log("Auth server is listening on port 8080")
})