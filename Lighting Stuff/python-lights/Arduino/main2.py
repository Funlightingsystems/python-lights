import serial
import time
import requests

ser = serial.Serial('/dev/ttyACM0', 9600)  # Replace with the correct serial port and baud rate

while True:
    try:
        response = requests.get('http://localhost:9090/get_dmx?u=1')
        data = response.json()
        channel_1_value = data['dmx'][0]
        print(channel_1_value)
        ser.write(channel_1_value.to_bytes(1, 'big'))  # Send data over serial as a single byte
        time.sleep(0.2)
    except:
        print('Error fetching data')
