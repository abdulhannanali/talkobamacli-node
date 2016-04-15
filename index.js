const talkobama = require("./talkobama.js")
const program = require("commander")
const readline = require("readline")
const colors = require("colors/safe")
const fs = require("fs")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

try {
    var obamaRecord = JSON.parse(fs.readFileSync("./obamaRecord.json")) || []    
}
catch (error) {
    var obamaRecord = []
}

rl.question("enter the text you wanna obama to talk to you.\n", function (answer) {
    if (!answer || !answer.trim()) {
        console.error(colors.red("You need to enter something you want obama to talk!!!\n"))
    }
    else {
        talkobama(answer.trim(), function (error, obamaObj) {
            console.log("\nObama is talking your thing here\n")
            console.log(colors.green(obamaObj.url))
            
            obamaObj.text = answer.trim()
            
            addRecord(obamaObj)            
        })

    }
    
    rl.close()
})


// Adds a record to the preexisting file of previous conversions
function addRecord (obj) {
    obamaRecord.push(obj)
    fs.writeFileSync("./obamaRecord.json", JSON.stringify(obamaRecord, null, 4))
}