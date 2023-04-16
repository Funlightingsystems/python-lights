import requests
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.OUT)

# create PWM object on GPIO 17 with frequency 100 Hz
pwm = GPIO.PWM(17, 100)
pwm.start(0) # start with duty cycle of 0%

while True:
    try:
        response = requests.get('http://localhost:9090/get_dmx?u=1')
        data = response.json()
        channel_1_value = data['dmx'][0]
        print(channel_1_value)
        
        # map channel value to duty cycle percentage
        duty_cycle = round(channel_1_value / 2.55)
        
        # set the duty cycle of the PWM signal
        pwm.ChangeDutyCycle(duty_cycle)

    except:
        print('Error fetching data')

    time.sleep(0.2)
