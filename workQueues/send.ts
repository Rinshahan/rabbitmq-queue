import amqp from 'amqplib'

const queue = 'task'
const message = process.argv.slice(2).join(' ') || 'helloworld'

const publish = async () => {
  const connect = await amqp.connect('amqp://localhost')
  const channel = await connect.createChannel()
  await channel.assertQueue(queue, { durable: true })
  channel.sendToQueue(queue, Buffer.from(message), { persistent: true })

  console.log('Sent : ', message)
  setTimeout(() => {
    connect.close()
    process.exit(0)
  }, 500)
}

publish()