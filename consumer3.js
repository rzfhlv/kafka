const {Kafka} = require('kafkajs')

run()
async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "someapp",
            "brokers": ["localhost:29092"]
        })

        const consumer = kafka.consumer({"groupId": "mantap-cuk"})
        console.log("Connecting...")
        await consumer.connect()
        console.log("Connected")

        await consumer.subscribe({
            "topic": "order",
            "fromBeginning": true
        })

        await consumer.run({
            "eachMessage": async result => {
                console.log(`Msg ${result.message.value} on partition ${result.partition}`)
            }
        })
    } catch (error) {
        console.error(`Error woy... ${error}`)
    }
}