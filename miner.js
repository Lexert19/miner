const mineflayer = require('mineflayer')
const mp = require('minecraft-protocol')
var vec3 = require('vec3');

const bot = mineflayer.createBot({
    host: 'nssv.pl',
    port: 25565,
    username: "aczity988",
    version: "1.12"
})

let first = false
bot.on('spawn', function () {
    const sync = () => new Promise(()=>{
        bot.chat("/l 1234");
        setTimeout(function () {
            bot.clickWindow(38, 0, 0)
        }, 2000);
        setTimeout(()=>{
            console.log("start")
            startDigging()
        },6000)
    })
    if(!first){
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

function selectBlock(){
    if (block == 0) {
        block = 1
        return bot.blockAt(bot.entity.position.offset(0, 0, -1))
    }else if(block == 1){
        block = 2
        return bot.blockAt(bot.entity.position.offset(-1, 0, -1))
    }else if(block == 2){
        block = 3
        return bot.blockAt(bot.entity.position.offset(-1, 0, 0))
    }else if(block == 3){
        block = 4
        return bot.blockAt(bot.entity.position.offset(-1, 0, 1))
    }else if(block == 4){
        block = 5
        return bot.blockAt(bot.entity.position.offset(0, 0, 1))
    }else if(block == 5){
        block = 6
        return bot.blockAt(bot.entity.position.offset(1, 0, 1))
    }else if(block == 6){
        block = 7
        return bot.blockAt(bot.entity.position.offset(1, 0, 0))
    }else if(block == 7){
        block = 0
        return bot.blockAt(bot.entity.position.offset(1, 0, -1))
    }
}

function putIntoChest() {
    var target = bot.blockAt(bot.entity.position.offset(2, 1, 0))
    if (target.name === "chest") {
        console.log("opened")
        var chest = bot.openChest(target);
        chest.on('open', () => {
            chest.deposit(4, null, 5000, (e) => {console.error(e)})
            chest.deposit(351, null, 5000, (e) => {console.error(e)})
            chest.deposit(1, null, 5000, (e) => {console.error(e)})
            setTimeout(() => {
                chest.close();
            }, 2400)
        })
        setTimeout(() => {
            startDigging()
        }, 3600)
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
        if (digged == 600) {
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
    }else{
        setTimeout(()=>{
            startDigging()
        },100)
    }
}

bot.on('error', err => console.log(err))

