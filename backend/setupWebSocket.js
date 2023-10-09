const chalk = require("chalk")
const globalPl = require("./models/global")
module.exports = (app) => {
  let d = Date.now()
  const expressWs = require('express-ws')(app);

  console.log(`${chalk.bgBlueBright("Pogget")} - WebSocket Opened`)
  console.log(`WebSocket listening...`)
  console.log(`${chalk.bgBlueBright("GateWay")} -  ${Date.now() - d} ms`)

  app.ws('/echo', function (ws, req) {
    ws.on('message', function (msg) {
      ws.send(`Successfull Connection`);
    });
  });
  app.ws("/api/gateway/global/plugins/wait", async(ws,req) => {
    ws.on("message", async(msg) => {
       let data   = (await globalPl.find())
    ws.send(JSON.stringify({op: 1 , process_type: "ADMIN", data: data.filter(a => a.status === "WAITING")}))
    })
    let data   = (await globalPl.find())
    ws.send(JSON.stringify({op: 1 , process_type: "ADMIN", data: data.filter(a => a.status === "WAITING")}))
  })
  // Global Plugins
  app.ws("/api/gateway/global/plugins", async (ws, req) => {
    ws.on("message", async (msg) => {
      let data =
		(await globalPl.find()) ||
		(await globalPl.find().filter((b) => b.status === "APPROVED"));
      ws.send(JSON.stringify({op: 1, data: data}))
    })
    
    let data =
		(await globalPl.find()) ||
		(await globalPl.find().filter((b) => b.status === "APPROVED"));
      ws.send(JSON.stringify({op: 1, data: data}))
  })
  /*setInterval(() => {
  console.log(expressWs.getWss().clients)
}, 15000)*/
}
