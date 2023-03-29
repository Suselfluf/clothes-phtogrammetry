# import pika 
# connection = pika.BlockingConnection(
#     pika.ConnectionParameters(host='192.168.137.196'))

# channel = connection.channel()

# channel.queue_declare(queue='photogrammetry')

# def callback(channel, method, properties, body):
#     print("Recieved message in photogrammetry queue")
#     print(body)



# channel.basic_consume(queue='photogrammetry', on_message_callback=callback)

# print("Started Consuming")

# channel.start_consuming()

# channel.close()



import json
import pika
import django
from sys import path
from os import environ


path.append('/Users/daniillyagin/Projects/Pet_Projects/CrockiClothing/AugmentedWorkshopModules/backend/augworkshop/settings.py') #Your path to settings.py file
environ.setdefault('DJANGO_SETTINGS_MODULE', 'augworkshop.settings') 
django.setup()
# from crokiclothes.models import Quote

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost', heartbeat=600, blocked_connection_timeout=300))
channel = connection.channel()
channel.queue_declare(queue='photogrammetry')

def callback(ch, method, properties, body):
    print("Received in django")
    print(body)


    # if properties.content_type == 'quote_created':
    #     quote = Quote.objects.create(id=data['id'], title=data['title'])
    #     quote.save()
    #     print("quote created")
    # elif properties.content_type == 'quote_updated':
    #     quote = Quote.objects.get(id=data['id'])
    #     quote.title = data['title']
    #     quote.save()
    #     print("quote updated")
    # elif properties.content_type == 'quote_deleted':
    #     quote = Quote.objects.get(id=data)
    #     quote.delete()
    #     print("quote deleted")
channel.basic_consume(queue='photogrammetry', on_message_callback=callback, auto_ack=True)
print("Started Consuming...")
channel.start_consuming()