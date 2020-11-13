const mineflayer = require('mineflayer');
const { Block } = require('prismarine-block');
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
        host: "192.168.0.122",
        port: 25565,
        username: "lagger123",
        version: "1.12.2",
        viewDistance: "tiny",
        logErrors: true,
    })

    bot.chunk

    bot.on('spawn', function () {
        setTimeout(function () {
            startLagging()
            console.log("start")
        }, 1200);
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
    try{
        openChest();
    }catch(e){

    }
   

    // await chest.on('open', function () {
    //     if (openedChest == false) {
    //         openedChest = true
    //         try {
    //             putItems(chest)
    //         } catch (e) {
    //             //openedChest = false
    //         }
    //     }
    // })

    await new Promise((resolve, reject) => setTimeout(resolve, 500));
    // await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    // await bot.chat("/tp -7000 80 -7000")
   
    // await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    // await bot.chat("/tp 7000 70 7000")
  
    await startLagging()
}


openChest = ()=>{
    bot._client.write('block_place', {
        location: bot.entity.position.offset(0, 0, 0),
        direction: 1,
        hand: 0,
        cursorX: 0.5,
        cursorY: 0.5,
        cursorZ: 0.5,
        insideBlock: false,
      })
}