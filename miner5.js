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
        username: "aczity989",
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
            bot.chat("/l 1234");
            //bot.activateItem()
            console.log("login")
        }, 3000);
        setTimeout(function () {
            //bot.activateItem()
            bot.clickWindow(38, 0, 0)
        }, 6000);
        setTimeout(() => {
            console.log("start")
            putIntoChest()
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
            try {
                await login()
            } catch (e) {
                await login()
            }
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
        digBlocks()
        // try {
        //     var target = selectBlock()
        // } catch (e) { }
        // if (target) {
        //     digBlocks(target)
        // }
    }
}

let counter = 0
async function putIntoChest() {
    counter += 1
    bot.chat("/repair all")
    var target = await bot.blockAt(bot.entity.position.offset(0, -1, -2))
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
}

let openedChest = false
async function putItems(chest) {
    await putItmes1(chest)

    let date = new Date()
    console.log("koniec: " + date.getHours() + ":" + date.getMinutes())
    await chest.close();
    openedChest = false
    await bot.lookAt(bot.entity.position.offset(-1, 0, 0))
    await startDigging()
}

async function putItmes1(chest) {
    for (let i = 0; i < 27; i++) {
        if (chest.window.slots[54 + i] == null)
            continue
        await bot.clickWindow((i + 54), 0, 0)
        await new Promise((resolve, reject) => setTimeout(resolve, 150));
        await bot.clickWindow(i, 0, 0)
        await new Promise((resolve, reject) => setTimeout(resolve, 150));

    }
    await new Promise((resolve, reject) => setTimeout(resolve, 500));
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
    if (digged >= 2400) {
        digged = 0
        try {
            console.log("ended")
            putIntoChest()
        } catch (e) {
            console.error(e)
            putIntoChest();
        }
    } else {
        startDigging()
    }
}

async function getTargetAndDig(i, j) {
    try {
        let height
        if (i < 0)
            height = i + 2 * (i * -1 - 1)
        else
            height = i - 2
        const target = await bot.blockAt(bot.entity.position.offset(i, height, j))

        await fastDig(target)
        if (target.name !== "air") {
            // await fastDig(target)
            //console.log("digged"+": "+i+"; : "+j)
            //await fastDig(target)
        } else {

            //await new Promise((resolve, reject) => setTimeout(resolve, 10));
        }
    } catch (e) { }
}

async function digBlocks() {
    await digblocksNew()
    await completed()
}

let stoner = 0
async function digblocksNew() {
    await new Promise((resolve, reject) => setTimeout(resolve, 100));
    for (let i = -1; i >= -4; i--) {
        for (let j = -4; j <= 4; j++) {
            await getTargetAndDig(i, j)
        }
    }

}

async function fastDig(target) {
    await new Promise((resolve, reject) => setTimeout(resolve, 5));
    await bot._client.write('block_dig', {
        status: 0, // start digging
        location: target.position,
        face: 1 // hard coded to always dig from the top
    })

    await bot._client.write('block_dig', {
        status: 2, // finish digging
        location: target.position,
        face: 1 // hard coded to always dig from the top
    })
    await bot._updateBlockState(target.position, 0)
    digged += 1

    // await bot.lookAt(target.position.offset(0.5, 0.5, 0.5), true, () => {

    //     bot._client.write('block_dig', {
    //         status: 0, // start digging
    //         location: target.position,
    //         face: 1 // hard coded to always dig from the top
    //     })

    //     bot._client.write('block_dig', {
    //         status: 2, // finish digging
    //         location: target.position,
    //         face: 1 // hard coded to always dig from the top
    //     })
    //     bot._updateBlockState(target.position, 0)
    //     digged += 1
    // })
    //await new Promise((resolve, reject) => setTimeout(resolve, 30));

}
