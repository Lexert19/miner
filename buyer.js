const mineflayer = require('mineflayer');
const { setTimeout } = require('timers');
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
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
        host: 'nssv.pl',
        port: 25565,
        username: "aczity988",
        version: "1.12",
        viewDistance: "tiny",
        logErrors: true,
    })

    navigatePlugin(bot)

    bot.on('spawn', function () {
        if (first)
                return 0

        connected = true
        first = true
        setTimeout(function () {
            bot.chat("/l 1234");
        }, 3000);
        setTimeout(function () {
            bot.clickWindow(38, 0, 0)
        }, 6000);
        setTimeout(() => {
            console.log("start")
            buying()
        }, 9000)
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
            await login()
        }
        await new Promise((resolve, reject) => setTimeout(resolve, 7000));
    }
}

async function buying() {
    await bot.chat("/home")

    await buy();
    await sklep3();
    await go();
    await sell();

    let date = new Date()
    console.log("koniec: "+date.getHours()+":"+date.getMinutes())
    buying()
}

async function buy(){
    while(true){
        if(bot.entity.position.y == 30){
            var target
            while (true) {
                try{
                    target = await bot.blockAt(bot.entity.position.offset(1, 0, 0))
                    if(target.name === "wall_sign"){
                        await bot.activateBlock(target)
                        break
                    }
                }catch(e){}
                await new Promise((resolve, reject) => setTimeout(resolve, 500));
            }
            break
        }
        await new Promise((resolve, reject) => setTimeout(resolve, 300));
    }
}

async function sklep3(){
    while(true){
        try{
            if(bot.entity.position.y == 130)
                break
            if(bot.entity.position.y == 30){
                bot.chat("/warp sklep3")
                await new Promise((resolve, reject) => setTimeout(resolve, 3000));
            } 
        }catch(e){
            console.log(e)
        }
        await new Promise((resolve, reject) => setTimeout(resolve, 500));
    }
}

var walking = false
async function go(){
    walking = false
    while(true){
        try{
            if(bot.entity.position.y == 130 && walking == false){
                walking = true
                await bot.navigate.to(bot.entity.position.offset(-4, -1, 8))
                await new Promise((resolve, reject) => setTimeout(resolve, 3000));
            }
            if(bot.entity.position.y == 129 && Math.floor(bot.entity.position.x) == -928)
                break
        }catch(e){}
        await new Promise((resolve, reject) => setTimeout(resolve, 300));
    }
}

async function sell(){
    while(true){
        if(bot.entity.position.y == 129 && Math.floor(bot.entity.position.x) == -928){
            for (let i = 0; i < 80; i++) {
                block = await bot.blockAt(bot.entity.position.offset(0, 0, 1))
                await bot.activateBlock(block)
                await new Promise((resolve, reject) => setTimeout(resolve, 500));
            }
            break;
        } 
        await new Promise((resolve, reject) => setTimeout(resolve, 300));
    }

}

bot.navigate.on("arrived",()=>{
    walking = false
})

bot.navigate.on('interrupted', function() {
    console.log("interrupted")
});