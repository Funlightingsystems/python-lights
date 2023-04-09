import artnet
import serial

# Set up the Artnet receiver
receiver = artnet.dmx.DmxReceiver()
receiver.start()

# Set up the serial port for the Arduino
serial_port = serial.Serial('/dev/ttyACM0', 9600)

# Define the Artnet device to receive packets from
device_ip = '192.168.1.100'
device_port = 6454

# Define the DMX channels for each color
red_channel = 1
green_channel = 2
blue_channel = 3

# Define the DMX channel for overall brightness or intensity
brightness_channel = 4

while True:
    # Receive an Artnet packet from the device
    packet = receiver.get()

    # Check if the packet came from the desired device
    if packet.get('address')[0] == device_ip and packet.get('address')[1] == device_port:
        # Get the RGB data from the packet
        red = packet.get('data')[red_channel]
        green = packet.get('data')[green_channel]
        blue = packet.get('data')[blue_channel]

        # Get the brightness data from the packet
        brightness = packet.get('data')[brightness_channel]

        # Print the RGB data and brightness to the terminal
        print(f"Red: {red}, Green: {green}, Blue: {blue}, Brightness: {brightness}")

        # Send the RGB data and brightness to the Arduino
        data = bytes([red, green, blue, brightness])
        serial_port.write(data)
