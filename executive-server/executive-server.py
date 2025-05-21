from asyncio import sleep
import pika

from generateImage import generate

def callback(ch, method, properties, body):
    generate()

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.queue_declare(queue='task_queue', durable=True)

print(" [*] Waiting for messages. To exit press CTRL+C")

channel.basic_consume(
    queue='task_queue',
    on_message_callback=callback,
    auto_ack=True
)

channel.start_consuming()
