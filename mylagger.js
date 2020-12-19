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
        version: "1.12.2",
        username: "lagger123",
        logErrors: true,
    })


    bot.on('spawn', function () {

        connected = true
        first = true
        setTimeout(function () {
            bot.chat("/l chuj123");
        }, 3000);
        setTimeout(function () {
            bot.setQuickBarSlot(0)
            
        }, 6000);
        setTimeout(function () {
            bot.activateItem()
        }, 6300);
        setTimeout(function () {
            bot.clickWindow(16,0,0)
        }, 6600);
        setTimeout(() => {
            startLagging()
            console.log("start")
            target = bot.blockAt(bot.entity.position.offset(0, 0, 0));
            console.log(target)
        }, 9000)


        /* setTimeout(function () {
            startLagging()
            console.log("start")
            target = bot.blockAt(bot.entity.position.offset(0, 0, 0));
        }, 1200); */
    });

    bot.on('error', err => console.log(err))

    bot.on('end', msg => {
        if (connected) {
            console.log("zerwano połączenie")
            connected = false
            first = false
            bot.quit()
            login()
        }
    })
}

async function connecting() {
    while (true) {
        if (connected == false) {
            console.log("try")
            try {
                connected == true
                await login()

            } catch (e) {
                console.log(e)
                //await login()
            }
        }
        await new Promise((resolve, reject) => setTimeout(resolve, 333333000));
    }
}

async function startLagging() {
    while(true){
        await openChest();
         //await new Promise((resolve, reject) => setTimeout(resolve, 70));
    }
}


var target; 
var chest;
async function openChest(){
    try{
        //bot.lookAt(bot.entity.position.offset(0, 0, 0))
        //console.log("+1");
        //chest = await bot.openChest(target)

        await new Promise((resolve, reject) => setTimeout(resolve, 100));
        bot._client.write('block_place', {
            direction: 1, 
            hand: 0,
            location: target.position,
            cursorX: 0, 
            cursorY: 0,
            cursorZ: 0, 
        })
    }catch(e){

    }
    
}

//ąćżźó