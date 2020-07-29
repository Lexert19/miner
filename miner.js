const mineflayer = require('mineflayer');
const { setTimeout } = require('timers');
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
var connected = false

try {
    connecting()
    connectingAfk()
} catch (e) { }

var bot
let first = false
function login() {
    bot = mineflayer.createBot({
        host: 'nssv.pl',
        port: 25565,
        username: "aczity988",
        version: "1.12"
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
            //bot.setControlState('jump', true)
            //putIntoChest()
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
        //login()
    })
}

bot.navigation.on("arrived",()=>{
    walking = false
})

var walking = true
async function buying() {
    walking = true
    await bot.chat("/home")
    await new Promise((resolve, reject) => setTimeout(resolve, 6000));

    while(true){
        if(bot.entity.position.y == 30){
            var target = await bot.blockAt(bot.entity.position.offset(1, 0, 0))
            await bot.activateBlock(target)
            await new Promise((resolve, reject) => setTimeout(resolve, 1000));
            break;
        }
        await new Promise((resolve, reject) => setTimeout(resolve, 300));
    }
    while(true){
        if(bot.entity.position.y == 128){
            break
        }
        else{
            await bot.chat("/warp sklep2")
            await new Promise((resolve, reject) => setTimeout(resolve, 5000));
        }
    }
    //await bot.chat("/warp sklep2")
    while(true){

        if(bot.entity.position.y == 128){
            await bot.navigate.to(bot.entity.position.offset(2, 1, 8))
        }
        if(walking==false)
            break
        await new Promise((resolve, reject) => setTimeout(resolve, 300));
    }
    while(true){
        if(bot.entity.position.y == 129 && Math.floor(bot.entity.position.x) == -928){
            for (let i = 0; i < 42; i++) {
                block = await bot.blockAt(bot.entity.position.offset(0, 0, 1))
                await bot.activateBlock(block)
                await new Promise((resolve, reject) => setTimeout(resolve, 1000));
            }
            break;
        } 
        await new Promise((resolve, reject) => setTimeout(resolve, 300));
    }

    let date = new Date()
    console.log("koniec: "+date.getHours()+":"+date.getMinutes())
    buying()
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

let block = 0
let digged = 0
function startDigging() {
    if (bot.targetDigBlock) {
        return 0;
    } else {
        botEquipPickaxe()
        try {
            var target = selectBlock()
        } catch (e) { }
        if (target) {
            if (block == 7) {
                bot.lookAt(bot.entity.position.offset(0, 1, 1))
            }
            setTimeout(() => {
                digBlock(target)
            }, 200)
        }
    }
}

function selectBlock() {
    if (block == 0) {
        block = 1
        return bot.blockAt(bot.entity.position.offset(0, 0, -1))
    } else if (block == 1) {
        block = 2
        return bot.blockAt(bot.entity.position.offset(-1, 0, -1))
    } else if (block == 2) {
        block = 3
        return bot.blockAt(bot.entity.position.offset(-1, 0, 0))
    } else if (block == 3) {
        block = 4
        return bot.blockAt(bot.entity.position.offset(-1, 0, 1))
    } else if (block == 4) {
        block = 5
        return bot.blockAt(bot.entity.position.offset(0, 0, 1))
    } else if (block == 5) {
        block = 6
        return bot.blockAt(bot.entity.position.offset(1, 0, 1))
    } else if (block == 6) {
        block = 7
        return bot.blockAt(bot.entity.position.offset(1, 0, 0))
    } else if (block == 7) {
        block = 0
        return bot.blockAt(bot.entity.position.offset(1, 0, -1))
    }
}

function selectBlock5() {
    if (block == 0) {
        block = 1
        return bot.blockAt(bot.entity.position.offset(-1, 1, 0))
    } else if (block == 1) {
        block = 2
        return bot.blockAt(bot.entity.position.offset(-2, 1, 0))
    } else if (block == 2) {
        block = 3
        return bot.blockAt(bot.entity.position.offset(-3, 1, 0))
    } else if (block == 3) {
        block = 7
        return bot.blockAt(bot.entity.position.offset(-4, 1, 0))
    } else if (block == 7) {
        block = 8
        return bot.blockAt(bot.entity.position.offset(0, 1, 1))
    } else if (block == 8) {
        block = 9
        return bot.blockAt(bot.entity.position.offset(0, 1, 2))
    } else if (block == 9) {
        block = 10
        return bot.blockAt(bot.entity.position.offset(0, 1, 3))
    } else if (block == 10) {
        block = 0
        return bot.blockAt(bot.entity.position.offset(0, 1, 4))
    }
}

let counter = 0
async function putIntoChest() {
    counter += 1
    bot.lookAt(bot.entity.position.offset(0, 1, -2))
    var target = await bot.blockAt(bot.entity.position.offset(0, 1, -2))
    var chest = await bot.openChest(target)
    chest = await bot.openChest(target);
    await chest.on('open', function () {
        if (openedChest == false) {
            openedChest = true
            try {
                putItems(chest)
            } catch (e) {
                //openedChest = false
            }
        }
    })
    setTimeout(() => {
        if (openedChest == false) {
            putIntoChest()
        }
    }, 4000)
}

let openedChest = false
async function putItems(chest) {
    console.log("good: " + ((counter - 1) * 3) + " s")
    counter = 0

    for (let i = 0; i < 0; i++) {
        bot.clickWindow((i + 54), 0, 0)
        bot.clickWindow(i, 0, 0)
        await new Promise((resolve, reject) => setTimeout(resolve, 500));
    }

    // let number4 = await bot.inventory.count(4)
    // let number1 = await bot.inventory.count(1)
    // let number351 = await bot.inventory.count(351)

    // let number16 = await bot.inventory.count(16)
    // let number15 = await bot.inventory.count(15)
    // let number14 = await bot.inventory.count(14)

    // let number264 = await bot.inventory.count(264)
    // let number73 = await bot.inventory.count(73)

    // await new Promise((resolve, reject) => setTimeout(resolve, 1200));
    // if (number4 > 0) {
    //     try{
    //         chest.deposit(4, null, number4)
    //     }catch(e){}
    // }
    // await new Promise((resolve, reject) => setTimeout(resolve, 5000));

    // if (number1 > 0) {
    //     chest.deposit(1, null, number1)
    // }
    // await new Promise((resolve, reject) => setTimeout(resolve, 5000));

    // if (number351 > 0) {
    //     chest.deposit(351, null, number351)
    // }
    // await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    // if (number16 > 0) {
    //     chest.deposit(16, null, number16)
    // }
    // await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    // if (number15 > 0) {
    //     chest.deposit(15, null, number15)
    // }
    // await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    // if (number14 > 0) {
    //     chest.deposit(14, null, number14)
    // }
    // await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    // if (number264 > 0) {
    //     chest.deposit(264, null, number264)
    // }
    // await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    // if (number73 > 0) {
    //     chest.deposit(73, null, number73)
    // }
    // await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    let date = new Date()
    console.log("koniec: " + date.getHours() + ":" + date.getMinutes())
    chest.close();
    bot.chat("/repair all")
    openedChest = false
    startDigging()
}

function botEquipPickaxe() {
    const mcData = require('minecraft-data')(bot.version)
    bot.equip(mcData["itemsByName"].diamond_pickaxe.id, 'hand', (err) => {
        if (err) {
            //console.log("0 kilof")
        } else {
        }
    })
}

function completed(e) {
    if (e) {
        console.error(e)
    }
    digged += 1
    if (digged == 1200) {
        digged = 0
        try {
            putIntoChest()
        } catch (e) {
            console.error(e)
            putIntoChest();
        }
    } else {
        startDigging()
    }
}

function digBlock(target) {
    if (bot.canDigBlock(target) && target.name !== "air") {
        bot.dig(target, completed)
    } else {
        setTimeout(() => {
            startDigging()
        }, 300)
    }
}

// bot.on('error', err => console.log(err))

// bot.on('end', msg => {
//     console.log("zerwano połączenie")
//     console.log(msg)
//     bot.quit()
//     login()
// })

var afk
var connectedAfk = false
var firstAfk = false
function afk(){
    // afk = mineflayer.createBot({
    //     host: 'nssv.pl',
    //     port: 25565,
    //     username: "wspanialy70",
    //     version: "1.12"
    // })

    // afk.on('spawn',()=>{
    //     if(firstAfk)
    //         return 0
    // })

    // afk.on('end', msg => {
    //     if (connectedAfk) {
    //         console.log("zerwano połączenie")
    //         connectedAfk = false
    //         firstAfk = false
    //         afk.quit()
    //     }
    // })
}

async function connectingAfk() {
    while (true) {
        if (connectedAfk == false) {
            console.log("try")
            await loginAfk()
        }
        await new Promise((resolve, reject) => setTimeout(resolve, 7000));
    }
}

function loginAfk(){
    afk = mineflayer.createBot({
        host: 'nssv.pl',
        port: 25565,
        username: "koblator4000",
        version: "1.12"
    })

    afk.on('spawn', function () {
        if (firstAfk)
            return 0

        connectedAfk = true
        firstAfk = true
        setTimeout(function () {
            afk.chat("/l chuj123");
        }, 3000);
        setTimeout(function () {
            afk.clickWindow(38, 0, 0)
        }, 6000);
        setTimeout(() => {
            console.log("start afk")
            afk.setControlState('jump', true)
        }, 9000)
    });

    afk.on('error', err => console.log(err))

    afk.on('end', msg => {
        if (connectedAfk) {
            console.log("zerwano połączenie")
            connectedAfk = false
            firstAfk = false
            afk.quit()
        }
        //login()
    })
}