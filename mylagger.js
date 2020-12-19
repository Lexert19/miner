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
        host: "192.168.0.123",
        port: 25565,
        username: "lagger123",
        logErrors: true,
    })


    bot.on('spawn', function () {
        setTimeout(function () {
            startLagging()
            console.log("start")
            target = bot.blockAt(bot.entity.position.offset(0, 0, 0));
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
    while(true){
        try{
            await openChest();
         }catch(e){
     
         }
         //await new Promise((resolve, reject) => setTimeout(resolve, 70));
    }
}


var target; 
var chest;
async function openChest(){
    try{
        //bot.lookAt(bot.entity.position.offset(0, 0, 0))
        //console.log("+1");
        chest = await bot.openChest(target)
        await new Promise((resolve, reject) => setTimeout(resolve, 50));
        bot.emit('chestLidMove', target, 2, target)
        // bot._client.write('block_dig', {
        //             status: 2, // finish digging
        //             location: target.position,
        //             face: 1 // hard coded to always dig from the top
        //           })
        // var chest = bot.openChest(target)
        // var chest = bot.openChest(target)
        // await new Promise((resolve, reject) => setTimeout(resolve, 50));
        // chest.close();
        // await new Promise((resolve, reject) => setTimeout(resolve, 50));
        // chest.close();
        // await chest.on('open', function () {
        //      chest.close();
        // })
    }catch(e){

    }
    
}
