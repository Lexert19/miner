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
        // if (block == 0) {
        //     var target = bot.blockAt(bot.entity.position.offset(0, 0, -1))
        //     block = 1
        // }
        // else if (block == 1) {
        //     var target = bot.blockAt(bot.entity.position.offset(-1, 0, 0))
        //     block = 2
        // }
        // else if (block == 2) {
        //     var target = bot.blockAt(bot.entity.position.offset(0, 0, 1))
        //     block = 3
        // }
        // else if(block == 3){
        //     var target = bot.blockAt(bot.entity.position.offset(1, 0, 0))
        //     block = 0
        // }
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

function putIntoChest() {
    var target = bot.blockAt(bot.entity.position.offset(0, 1, -2))
    if (target.name === "chest") {
        console.log("opened")
        var chest = bot.openChest(target);
        chest = bot.openChest(target);
        chest.on('open', () => {
            console.log("good")
            putItems(chest)
            setTimeout(() => {
                chest.close();
            }, 19000)
        })
        setTimeout(() => {
            startDigging()
        }, 20000)
    }
}

async function putItems(chest) {
    let number = await bot.inventory.count(4)
    if (number > 0) {
        await chest.deposit(4, null, number)
    }
    await new Promise((resolve, reject) => setTimeout(resolve, 4000));

    number = await bot.inventory.count(1)
    if (number > 0) {
        await chest.deposit(1, null, number)
    }

    await new Promise((resolve, reject) => setTimeout(resolve, 4000));
    number = await bot.inventory.count(351)
    if (number > 0) {
        await chest.deposit(351, null, number)
    }

    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    number = await bot.inventory.count(16)
    if (number > 0) {
        await chest.deposit(16, null, number)
    }

    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    number = await bot.inventory.count(15)
    if (number > 0) {
        await chest.deposit(15, null, number)
    }

    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    number = await bot.inventory.count(14)
    if (number > 0) {
        await chest.deposit(14, null, number)
    }

    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    number = await bot.inventory.count(264)
    if (number > 0) {
        await chest.deposit(264, null, number)
    }
}

function botEquipPickaxe() {
    const mcData = require('minecraft-data')(bot.version)
    bot.equip(mcData["itemsByName"].diamond_pickaxe.id, 'hand', (err) => {
        if (err) {
            //console.log("error: "+err)
        } else {
        }
    })
}

function completed(e) {
    const sync = () => new Promise(() => {
        if (e) {
            console.error(e)
        }
        digged += 1
        if (digged == 1200) {
            digged = 0
            try {
                putIntoChest()
            } catch (e) {
                startDigging();
            }
        } else {
            startDigging()
        }
    })
    sync()
}

function digBlock(target) {
    if (bot.canDigBlock(target) && target.name !== "air") {
        bot.dig(target, completed)
    } else {
        setTimeout(() => {
            startDigging()
        }, 100)
    }
}

bot.on('error', err => console.log(err))

