const {format, createLogger, transports} = require('winston')
require('winston-daily-rotate-file') 
require('winston-mongodb')

const {combine, timestamp, label, prettyPrint} = format

const logger = createLogger({
    level: "debug",
    format: combine (
        label({label: "Logs for Users Products App"}),
        timestamp({ 
            format:"DD-MM-YYYY HH:mm:ss"
    }),
    format.json(),
    //prettyPrint()
    ),
    transports: [
        new transports.Console(),   //στην κονσόλα
        new transports.File({       //στο αρχείο
            filename: "logs/example.log"
        })
    ]
}) 
module.exports = logger