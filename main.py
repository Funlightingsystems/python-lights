import requests
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.OUT)

while True:
    try:
        response = requests.get('http://localhost:9090/get_dmx?u=1')
        data = response.json()
        channel_1_value = data['dmx'][0]
        print(channel_1_value)
        if channel_1_value > 127:
            GPIO.output(17, GPIO.HIGH)
        else:
            GPIO.output(17, GPIO.LOW)

    except:
        print('Error fetching data')

    time.sleep(0.2)

