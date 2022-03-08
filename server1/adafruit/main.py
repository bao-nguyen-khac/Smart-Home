import random
import sys
import time

import serial.tools.list_ports
from Adafruit_IO import MQTTClient
from sympy import true

AIO_FEED_ID = "smart-led"
AIO_USERNAME = "baonguyenkhac"
AIO_KEY = "aio_mClp60h467MAjV7aHUzpknH7iuhT"

def connected ( client ) :
    print ("Ket noi thanh cong ...")
    client.subscribe ( AIO_FEED_ID )

def subscribe ( client , userdata , mid , granted_qos ) :
    print(" Subcribe thanh cong ...")

def disconnected ( client ) :
    print(" Ngat ket noi ...")
    sys.exit(1)

def message ( client , feed_id , payload ):
    print(" Nhan du lieu : " + payload )

def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB Serial Device" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    return commPort

print(getPort())
# ser = serial.Serial( port=getPort(), baudrate=115200)

# client = MQTTClient ( AIO_USERNAME , AIO_KEY )
# client.on_connect = connected
# client.on_disconnect = disconnected
# client.on_message = message
# client.on_subscribe = subscribe
# client.connect ()
# client.loop_background ()

# while True :
#     value = random.randint(0 , 1)
#     print ("Cap nhat :", value )
#     client.publish("smart-led", value )
#     time.sleep (2)

