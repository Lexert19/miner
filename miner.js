const mineflayer = require('mineflayer');
const { setTimeout } = require('timers');
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
const { Vec3 } = require('vec3');

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
        host: 'craftplay.pl',
        port: 25565,
        username: "Monika17",
        version: "1.12.2",
        logErrors: true,
    })

    bot.on('spawn', function () {
        if (first)
                return 0

        connected = true
        first = true
        setTimeout(function () {
            bot.chat("/l chuj123");
            bot.activateItem()
            console.log("login")
        }, 3000);
        setTimeout(function () {
            //bot.activateItem()
            bot.clickWindow(25, 0, 0)
        }, 6000);
        setTimeout(() => {
            console.log("start")
            lagging()
            //putIntoChest()
        }, 10000)
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

async function lagging(){
    await new Promise((resolve, reject) => setTimeout(resolve, 1200));
    await bot.chat("/p visit 0plinska0")
    await bot.lookAt(new Vec3(-1, 100, -1))
    await new Promise((resolve, reject) => setTimeout(resolve, 1200));
    await bot.chat("/p visit filipkoxpl")
    await bot.lookAt(new Vec3(1, 100, 1))
    await lagging()
}

async function connecting() {
    while (true) {
        if (connected == false) {
            console.log("try")
            try{
                await login()
            }catch(e){
                await login()
            }
        }
        await new Promise((resolve, reject) => setTimeout(resolve, 3333000));
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
            digBlock(target)
            // if (block == 7) {
            //     bot.lookAt(bot.entity.position.offset(0, 1, 1))
            // }
            // setTimeout(() => {
            //     digBlock(target)
            // }, 200)
        }
    }
}

function selectBlock() {
    let target
    if(block<=3){
        target = bot.blockAt(bot.entity.position.offset(-1, 0, block+1))
    }
    else if(block<=7 && block>3){
        target = bot.blockAt(bot.entity.position.offset(0, 0, block-3))
    }
    else if(block<=11 && block>7){
        target = bot.blockAt(bot.entity.position.offset(1, 0, block-7))
    }
    else if(block<=15 && block>11){
        target = bot.blockAt(bot.entity.position.offset(2, 0, block-11))
    }
    // else if(block<=19 && block>15){
    //     target = bot.blockAt(bot.entity.position.offset(-block+15, 0, 3))
    // }
    block++;
    if(block==16)
        block=0
    //console.log(target.position)
    return target

    // if (block == 0) {
    //     block = 1
    //     return bot.blockAt(bot.entity.position.offset(0, -1, -1))
    // } else if (block == 1) {
    //     block = 2
    //     return bot.blockAt(bot.entity.position.offset(-1, -1, -1))
    // } else if (block == 2) {
    //     block = 3
    //     return bot.blockAt(bot.entity.position.offset(-1, -1, 0))
    // } else if (block == 3) {
    //     block = 4
    //     return bot.blockAt(bot.entity.position.offset(-1, -1, 1))
    // } else if (block == 4) {
    //     block = 5
    //     return bot.blockAt(bot.entity.position.offset(0, -1, 1))
    // } else if (block == 5) {
    //     block = 6
    //     return bot.blockAt(bot.entity.position.offset(1, -1, 1))
    // } else if (block == 6) {
    //     block = 7
    //     return bot.blockAt(bot.entity.position.offset(1, -1, 0))
    // } else if (block == 7) {
    //     block = 0
    //     return bot.blockAt(bot.entity.position.offset(1, -1, -1))
    // }
}

let counter = 0
async function putIntoChest() {
    counter += 1
    bot.lookAt(bot.entity.position.offset(-2, 0, 0))
    var target = await bot.blockAt(bot.entity.position.offset(-2, 0, 0))
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

    for (let i = 0; i < 27; i++) {
        await bot.clickWindow((i + 54), 0, 0) 
        await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        await bot.clickWindow(i, 0, 0)
        await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    }

    let date = new Date()
    console.log("koniec: " + date.getHours() + ":" + date.getMinutes())
    chest.close();
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
        //bot.dig(target, completed)
        fastDig(target)
    } else {
        setTimeout(() => {
            startDigging()
        }, 30)
    }
}

async function fastDig(target){
    // await bot.lookAt(target.position.offset(0.5, 0.5, 0.5), true, ()=>{
    //     await bot._client.write('block_dig', {
    //         status: 0, // start digging
    //         location: target.position,
    //         face: 1 // hard coded to always dig from the top
    //     })
    
    //     await new Promise((resolve, reject) => setTimeout(resolve, 50));
    
    //     await bot._client.write('block_dig', {
    //         status: 2, // finish digging
    //         location: target.position,
    //         face: 1 // hard coded to always dig from the top
    //       })
    //     bot._updateBlockState(target.position, 0)
    
    //     completed()
    // })
}
