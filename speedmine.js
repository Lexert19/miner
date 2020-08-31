module.exports = inject

function inject (bot) {
    function fastdig(target){
        const x = target.position.x 
        const y = target.position.y 
        const z = target.position.z 
        bot.lookAt(block.position.offset(x, y, z)
        bot._client.write('block_dig', {
            status: 0, // start digging
            location: block.position,
            face: 1 // hard coded to always dig from the top
        })
        bot.targetDigBlock = target
    }
}