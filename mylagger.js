const mineflayer = require('mineflayer');
const { setTimeout } = require('timers');
var connected = false

try {
    connecting()
} catch (e) {
    console.log(e)
}

var bot
let first = false
function login() {
    bot = mineflayer.createBot({
        host: "192.168.0.121",
        port: 25565,
        username: "lagger123",
        //version: false,
        logErrors: true,
    })

    bot.on('spawn', function () {
        setTimeout(function () {
            startLagging()
            console.log("start")
        }, 5000);
    });

    bot.on('error', err => console.log(err))

    bot.on('end', msg => {
        if (connected) {
            console.log("zerwano połączenie")
            connected = false
            first = false
            bot.quit()
        }
    })
}

async function connecting() {
    while (true) {
        if (connected == false) {
            console.log("try")
            try {
                await login()
            } catch (e) {
                //await login()
            }
        }
        await new Promise((resolve, reject) => setTimeout(resolve, 333333000));
    }
}

async function startLagging() {
 
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    await bot.chat("/tp -7000 80 -7000")
   
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    await bot.chat("/tp 7000 70 7000")
  
    await startLagging()
}
