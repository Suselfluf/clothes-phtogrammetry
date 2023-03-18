import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='photogrammetry')

def publish(): 
    channel.basic_publish(exchange='',routing_key="photogrammetry", body="hello")
    print(" [x] Sent 'Hello World!'")
    connection.close()