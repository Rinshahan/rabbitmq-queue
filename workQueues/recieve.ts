import amqp from 'amqplib'

const queueName = 'task'


const recieveMessage = async () => {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  await channel.assertQueue(queueName, { durable: false })
  console.log(`waiting for messages in queue `, queueName)
  channel.consume(queueName, (msg) => {
    const secs = msg?.content.toString().split('.').length
    console.log(`[x] Recieved : `, msg?.content.toString());
    setTimeout(() => {
      console.log("done resizing image")
    }, secs * 1000)
  }, { noAck: true })
}

recieveMessage()