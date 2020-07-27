const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
    host: 'nssv.pl',
    port: 25565,
    username: "aczity988",
    version: "1.12"
})

let first = false
bot.on('spawn', function () {
    const sync = () => new Promise(() => {
        setTimeout(function () {
            bot.chat("/l 1234");
        }, 3000);
        setTimeout(function () {
            bot.clickWindow(38, 0, 0)
        }, 6000);
        setTimeout(() => {
            console.log("start")
            startDigging()
        }, 9000)
    })
    if (!first) {
        first = true
        sync()
    }
    //bot.setQuickBarSlot(1)
    //bot.activateItem()
    // setTimeout(function () {
    //     bot.clickWindow(38, 0, 0)
    // }, 2000);
    // setTimeout(()=>{
    //     console.log("start")
    //     startDigging()
    // },6000)
    //bot.setControlState('forward', true)
    //bot.setControlState('jump', true)
    //bot.quit()
});

let block = 0
let digged = 0
function startDigging() {
    if (bot.targetDigBlock) {
        return 0;
    } else {
        botEquipPickaxe()
        var target = selectBlock()
        if (target) {
            digBlock(target)
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
            putItems(chest)
        }
    })
    setTimeout(() => {
        if (openedChest == false) {
            putIntoChest()
        }
    }, 4000)
    // if (target.name === "chest") {
    //     console.log("opened")
    //     let chest = bot.openChest(target);
    //     //chest.count()
    //     chest.on('open', ()=>{
    //         console.log("good")
    //         putItems(chest)
    //     })
    // test()
    // .then(()=>{
    //     chest = bot.openChest(target);
    //     chest.on('open', function(){
    //         putItems(chest)
    //     })
    // })
    // .then(()=>{
    //     console.log(chest)
    //     chest.close()
    // })
    //var chest = await bot.openChest(target);
    //await chest.close()
    //chest = bot.openChest(target);
    //chest = await bot.openChest(target);
    //console.log(chest)
    // chest.on('open', function(){
    //     putItems(chest)
    //     // console.log("good")
    //     // await putItems(chest)
    //     // await setTimeout(() => {
    //     //     await chest.close();
    //     //     await startDigging()
    //     // }, 19000)
    // })
    //}
}

let openedChest = false
async function putItems(chest) {
    console.log("good: " + ((counter-1) * 3) + " s")
    counter = 0

    let number4 = await bot.inventory.count(4)
    let number1 = await bot.inventory.count(1)
    let number351 = await bot.inventory.count(351)

    let number16 = await bot.inventory.count(16)
    let number15 = await bot.inventory.count(15)
    let number14 = await bot.inventory.count(14)

    let number264 = await bot.inventory.count(264)
    let number73 = await bot.inventory.count(73)

    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    if (number4 > 0) {
        chest.deposit(4, null, number4)
    }
    await new Promise((resolve, reject) => setTimeout(resolve, 4000));

    if (number1 > 0) {
        chest.deposit(1, null, number1)
    }
    await new Promise((resolve, reject) => setTimeout(resolve, 4000));

    if (number351 > 0) {
        chest.deposit(351, null, number351)
    }
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    if (number16 > 0) {
        chest.deposit(16, null, number16)
    }
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    if (number15 > 0) {
        chest.deposit(15, null, number15)
    }
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    if (number14 > 0) {
        chest.deposit(14, null, number14)
    }
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    if (number264 > 0) {
        chest.deposit(264, null, number264)
    }
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    if (number73 > 0) {
        chest.deposit(73, null, number264)
    }
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    console.log("koniec"+(Date.now()/60000))
    chest.close();
    openedChest = false
    startDigging()
}

const mcData = require('minecraft-data')(bot.version)
function botEquipPickaxe() {
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

bot.on('error', err => console.log(err))

bot.on('end', msg =>{
    console.log("zerwano połączenie")
    console.log(msg)
    bot.end()
})
