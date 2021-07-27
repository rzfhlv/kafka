const {Kafka} = require('kafkajs')
const msg = process.argv[2]

run()
async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "someapp",
            "brokers": ["localhost:29092"]
        })

        const producer = kafka.producer()
        console.log('Connecting...')
        await producer.connect()
        console.log("Connected")

        const partition = msg[0] < "N" ? 0 : 1
        // outbox pattern
        // di simpen db ("messages": )
        const result = await producer.send({
            "topic": "order",
            "messages": [
                {
                    "value": msg,
                    "partition": partition
                }
            ]
        })

        console.log(`Publish Success! ${JSON.stringify(result)}`)
        await producer.disconnect()
    } catch (error) {
        console.error(`Error woy... ${error}`)
    } finally {
        process.exit(0)
    }
}