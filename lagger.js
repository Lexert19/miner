const mineflayer = require('mineflayer');
const { setTimeout } = require('timers');
const { Vec3 } = require('vec3');
var connected = false

try {
    connecting()
} catch (e) {
    console.log(e)
}

var id;
var bot
let first = false
let counter = 0
function login() {
    id = Math.floor(Math.random() * (100 -0 + 1) + 0)
    bot = mineflayer.createBot({
        host: '192.168.0.116',
        port: 25565,
        username: "lagger"+id,
        version: "1.12.2",
        logErrors: true,
    })

    bot.on('spawn', function () {
        setTimeout(function () {
            startLagging()
            console.log("start")
        }, 5000);
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
        await new Promise((resolve, reject) => setTimeout(resolve, 33333000));
    }
}

let lag = 0
let lagCounter = 0
async function startLagging() {
    lag += 1
    if (lag >= 5000) {
        lagCounter += 1
        lag = 0
        console.log("lag: " + lagCounter)
    }
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    await bot.chat("/tp -260 70 260")
    // await bot._client.write('block_dig', {
    //     status: 0, // start digging
    //     location: new Vec3(0, 0, 0),
    //     face: 1 // hard coded to always dig from the top
    // })
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    await bot.chat("/tp 4000 70 4000")
    // await bot._client.write('block_dig', {
    //     status: 2, // finish digging
    //     location: new Vec3(0,0,0),
    //     face: 1 // hard coded to always dig from the top
    // })
    await startLagging()
}

// async function fastDig(target){
//     await bot.lookAt(target.position.offset(0.5, 0.5, 0.5), true, ()=>{
//         await bot._client.write('block_dig', {
//             status: 0, // start digging
//             location: target.position,
//             face: 1 // hard coded to always dig from the top
//         })

//         await new Promise((resolve, reject) => setTimeout(resolve, 50));

//         await bot._client.write('block_dig', {
//             status: 2, // finish digging
//             location: target.position,
//             face: 1 // hard coded to always dig from the top
//           })
//         bot._updateBlockState(target.position, 0)

//         completed()
//     })
// }
