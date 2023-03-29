import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost',heartbeat=600, blocked_connection_timeout=300))
channel = connection.channel()

channel.queue_declare(queue='photogrammetry')

def publish(message): 
    channel.basic_publish(exchange='',routing_key="photogrammetry", body=message)
    print(" [x] Sent 'Hello World!'")
    connection.close()