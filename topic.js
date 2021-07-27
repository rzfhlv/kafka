const {Kafka} = require('kafkajs')

run()
async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "someapp",
            "brokers": ["localhost:29092"]
        })

        const admin = kafka.admin()
        console.log("Connecting...")
        await admin.connect()
        console.log("Connected...")

        await admin.createTopics({
            "topics": [{
                "topic": "order",
                "numPartitions": 2
            }]
        })
        console.log("Topic Created.")
        await admin.disconnect()
    } catch (error) {
        console.error(`Error woy ${error}`)
    } finally {
        process.exit(0)
    }
}