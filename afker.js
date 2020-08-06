const mineflayer = require('mineflayer');

var afk
var connectedAfk = false
var firstAfk = false

try {
    connectingAfk()
} catch (e) { 
    console.log(e)
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
        }, 1000);
        setTimeout(function () {
            afk.clickWindow(38, 0, 0)
        }, 4000);
        setTimeout(() => {
            console.log("start afk")
            afk.setControlState("jump", true)
        }, 8000)
    });

    afk.on('error', err => console.log(err))

    afk.on('end', msg => {
        if (connectedAfk) {
            console.log("zerwano połączenie")
            connectedAfk = false
            firstAfk = false
            afk.quit()
        }
    })
}
