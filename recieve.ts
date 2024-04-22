import express, { Express } from 'express'
import amqp from 'amqplib'

const app: Express = express()

const queueName = 'rifash'
const recieveMessage = async () => {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  await channel.assertQueue(queueName, { durable: false })
  console.log(`Waiting for the messages from queue ${queueName}`)
  channel.consume(queueName, (msg) => {
    console.log(`Recieved the message, Mesage is : ${msg?.content}`)
  }, { noAck: true })
}

recieveMessage()

app.listen(4000, () => {
  console.log('running on 4000')
})