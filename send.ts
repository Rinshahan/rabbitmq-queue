import amqp from 'amqplib'
import express, { Express } from 'express'

const app: Express = express()

const queue = 'rifash'
const message = 'hi rifash ,'

const publishMsg = async () => {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  await channel.assertQueue(queue, { durable: false })
  channel.sendToQueue(queue, Buffer.from(message));
  console.log('Message Send : ', message)
  setTimeout(() => {
    connection.close()
    process.exit(0)
  })
}


publishMsg()




app.listen(3000, () => {
  console.log("running on 3000")
})