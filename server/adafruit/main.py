import random
import sys
import time

import serial.tools.list_ports
from Adafruit_IO import MQTTClient
from sympy import true

AIO_FEED_ID_1 = "smart-led-1"
AIO_FEED_ID_2 = "smart-led-2"
AIO_USERNAME = "baonguyenkhac"
AIO_KEY = "aio_OFXY32LdNJqtiZb5KQgxguUq6GHG"

def connected ( client ) :
    print ("Ket noi thanh cong ...")
    client.subscribe( AIO_FEED_ID_1 )
    client.subscribe( AIO_FEED_ID_2 )

def subscribe ( client , userdata , mid , granted_qos ) :
    print(" Subcribe thanh cong ...")

def disconnected ( client ) :
    print(" Ngat ket noi ...")
    sys.exit(1)

def message ( client , feed_id , payload ):
    print(" Nhan du lieu : " + payload )

client = MQTTClient ( AIO_USERNAME , AIO_KEY )
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect ()
client.loop_background ()

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

# print(getPort())
# ser = serial.Serial( port=getPort(), baudrate=115200)
ser = serial.Serial( port="COM5", baudrate=115200)

mess = ""
def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    if splitData[1] == "LED":
        name = "smart-led-" + splitData[0]
        client.publish(name, splitData[2])

mess = ""
def readSerial():
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1])
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]

while True:
    readSerial()
    time.sleep(1)
