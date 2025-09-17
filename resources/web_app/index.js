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


const state = {
    title: "Web App",
    IP_ADDR: getLocalIP()
}
 

app.get("/", (req, res) => {
    res.send(
        `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${state.title}</title>
            </head>
            <body>
                <h1>Hi there from: ${state.IP_ADDR}</h1>
            </body>
            </html>
        `
    )
})

app.get('/protected', async (req, res) => {
    try {
        const url = process.env.AUTH_API_URL;
        
        if (!url) {
            return res.status(400).json({ 
                error: 'FETCH_URL environment variable is not set' 
            });
        }

        const response = await fetch(url);
        
        if (!response.ok) {
            return res.status(response.status).json({ 
                error: `HTTP error! status: ${response.status}` 
            });
        }
        const data = await response.json();
        
        data.success ? res.json({message: "Success, here is your data."}) : res.json({data: "Unauthorized."})
        
        
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ 
            error: 'Failed to fetch or parse data',
            message: error.message 
        });
    }
});

app.listen(8080, () => {
    console.log("Web App is listening on port 8080")
})