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
        host: 'craftplay.pl',
        port: 25565,
        username: "Monika17",
        version: "1.12",
        viewDistance: "tiny",
        logErrors: true,
    })

    bot.on('spawn', function () {
        if (first)
                return 0

        connected = true
        first = true
        setTimeout(function () {
            //bot.chat("/l chuj123");
            bot.activateItem()
            console.log("login")
        }, 3000);
        setTimeout(function () {
            //bot.activateItem()
            bot.clickWindow(11, 0, 0)
        }, 6000);
        setTimeout(() => {
            console.log("start")
            startDigging()
            //bot.setControlState('jump', true)
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
    if (block == 0) {
        block = 1
        return bot.blockAt(bot.entity.position.offset(0, -1, -1))
    } else if (block == 1) {
        block = 2
        return bot.blockAt(bot.entity.position.offset(-1, -1, -1))
    } else if (block == 2) {
        block = 3
        return bot.blockAt(bot.entity.position.offset(-1, -1, 0))
    } else if (block == 3) {
        block = 4
        return bot.blockAt(bot.entity.position.offset(-1, -1, 1))
    } else if (block == 4) {
        block = 5
        return bot.blockAt(bot.entity.position.offset(0, -1, 1))
    } else if (block == 5) {
        block = 6
        return bot.blockAt(bot.entity.position.offset(1, -1, 1))
    } else if (block == 6) {
        block = 7
        return bot.blockAt(bot.entity.position.offset(1, -1, 0))
    } else if (block == 7) {
        block = 0
        return bot.blockAt(bot.entity.position.offset(1, -1, -1))
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
    bot.lookAt(bot.entity.position.offset(-2, 1, 0))
    var target = await bot.blockAt(bot.entity.position.offset(-2, 1, 0))
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
        await new Promise((resolve, reject) => setTimeout(resolve, 300));
        await bot.clickWindow(i, 0, 0)
        await new Promise((resolve, reject) => setTimeout(resolve, 300));
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
        bot.dig(target, completed)
    } else {
        setTimeout(() => {
            startDigging()
        }, 300)
    }
}
