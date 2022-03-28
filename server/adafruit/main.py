import datetime
import random
import sys
import time

import pymongo
import serial.tools.list_ports
from Adafruit_IO import MQTTClient
from sympy import true

# AIO_FEED_ID = ['smart-led-1', 'smart-led-2', 'smart-temp-1', 'smart-humi-1']
AIO_FEED_ID = ['smart-led-1', 'smart-led-2', 'smart-doorPrivate-1']
AIO_USERNAME = "baonguyenkhac"
AIO_KEY = "aio_Hfnz79nRupK7iPtcnyNb8ata7N4g"

def connected ( client ) :
    print ("Ket noi thanh cong ...")
    for each in AIO_FEED_ID:
        client.subscribe( each )
    
def subscribe ( client , userdata , mid , granted_qos ) :
    print(" Subcribe thanh cong ...")

def disconnected ( client ) :
    print(" Ngat ket noi ...")
    sys.exit(1)

def message ( client , feed_id , payload ):
    feed = feed_id.split('-')
    # if feed[1] == 'led':
    #     name = 'LED'
    #     key = feed[2]
    # if feed[1] == 'doorPrivate':
    #     name = 'TEMP'
    #     key = feed[2]
    # data = [key, name, payload]
    # sendDataToDB(data)
    print(" Nhan du lieu : " + payload )
    ser.write((feed[1] + feed[2] + str(payload) + "#").encode())

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
ser = serial.Serial( port=getPort(), baudrate=115200)
# ser = serial.Serial( port="COM5", baudrate=115200)  

mess = ""
def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    try:
        if splitData[1] == "LED":
            name = "smart-led-" + splitData[0]
            client.publish(name, splitData[2])
        if splitData[1] == "TEMP":
            name = "smart-temp-" + splitData[0]
            client.publish(name, splitData[2])
        if splitData[1] == "HUMI":
            name = "smart-humi-" + splitData[0]
            client.publish(name, splitData[2])
        if splitData[1] == "LIGHT":
            name = "smart-light" + splitData[0]
            client.publish(name, splitData[2])
        if splitData[1] == "GAS":
            name = "smart-gas" + splitData[0]
            client.publish(name, splitData[2])
        if splitData[1] == "DOOR":
            name = "smart-door" + splitData[0]
            client.publish(name, splitData[2])
    except:
        pass

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

# Connect Mongodb
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["smart-home"]
def sendDataToDB(data):
    if data[1] == "LED":
        mycol = mydb["smart-led"]
        key = 'smart-led-' + data[0]
    if data[1] == "TEMP":
        mycol = mydb["smart-temp"]
        key = 'smart-temp-' + data[0]
    now = datetime.datetime.now()
    output = {
        "name": data[1],
        "key": key,
        "data": data[2],
        "createAt": now
    }
    # mycol.insert_one(output)

client = MQTTClient ( AIO_USERNAME , AIO_KEY )
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect ()
client.loop_background ()

while True:
    readSerial()
    time.sleep(5)
