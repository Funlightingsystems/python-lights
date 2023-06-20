var HTTPs = require("http");
var FileSystem = require("fs");

var host = "http://127.0.0.1:38492";
function getBatteryLevelCharacter(percentage) {
    if (percentage == 1) {
        return "";
    }
    else
        return String.fromCharCode("".charCodeAt(0) + 1 + Math.round(8 * percentage));
}
function getTemperatureLevelCharacter(percentage) {
    return String.fromCharCode("".charCodeAt(0) + Math.round(4 - 4 * percentage));
}
function lerpColorArray(fromColor, toColor, lerpFactor) {
    return [
        fromColor[0] + (toColor[0] - fromColor[0]) * lerpFactor,
        fromColor[1] + (toColor[1] - fromColor[1]) * lerpFactor,
        fromColor[2] + (toColor[2] - fromColor[2]) * lerpFactor,
    ];
}
function toAnsiEscapeColor(color) {
    return "\u001B[38;2;".concat(Math.round(color[0]), ";").concat(Math.round(color[1]), ";").concat(Math.round(color[2]), "m");
}
function nearDateConversion(seconds) {
    var factors = { seconds: 1, minutes: 1 / 60, hours: 1 / 60, days: 1 / 24 };
    var timeLevel = "seconds";
    for (var i in factors) {
        var v = factors[i];
        if (v * seconds > 1) {
            seconds = v * seconds;
            timeLevel = i;
        }
        else
            break;
    }
    return Math.floor(seconds + .5) + " " + timeLevel;
}
function update() {
    var clientRequest = HTTPs.request(host + "/GetDeviceStatus?authenticationKey=some_key", {
        method: "GET",
    }, function (incomingMessage) {
        var dataBuffer = "";
        incomingMessage.on("data", function (data) {
            dataBuffer += data;
        });
        incomingMessage.on("end", function () {
            var parsedData = JSON.parse(dataBuffer);
            var devices = parsedData//.ConnectedDevices;
            console.log("\x1B[2J");
            console.log("_____________________________________________________________");
            for (var i in devices) {
                var device = devices[i];
                device.DateUpdated = new Date(device.timeSinceLastUpdate);
                var statusColor = "\x1B[38;2;0;170;255m";
                if (Date.now() - device.DateUpdated.getTime() > 3600000) {
                    statusColor = "\x1B[38;2;255;0;85m";
                }
                else if (Date.now() - device.DateUpdated.getTime() > 600000) {
                    statusColor = "\x1B[38;2;255;127;0m";
                }
                else if (Date.now() - device.DateUpdated.getTime() > 120000) {
                    statusColor = "\x1B[38;2;0;255;127m";
                }
                var leftStatusText = "[".concat(device.deviceName, "]");
                var rightStatusText = "";
                if (device.temperature.supported) {
                    var percentage = Math.max(0, Math.min(1, (device.temperature.temperatureLevel - 15) / 45));
                    rightStatusText += toAnsiEscapeColor(lerpColorArray([0, 170, 255], [255, 0, 85], percentage));
                    rightStatusText += "".concat(getTemperatureLevelCharacter(percentage), " ").concat(Math.round(device.temperature.temperatureLevel), "\u00B0C\u001B[0m");
                }
                else
                    rightStatusText += "------";
                rightStatusText += "\t";
                if (device.cpuUsage.supported) {
                    rightStatusText += toAnsiEscapeColor(lerpColorArray([255, 255, 255], [255, 0, 85], device.cpuUsage.cpuUsage / 100));
                    rightStatusText += "\uF080 ".concat(Math.round(device.cpuUsage.cpuUsage), "%\u001B[0m");
                }
                else
                    rightStatusText += "------";
                rightStatusText += "\t";
                if (device.power.supported) {
                    if (device.power.charging) {
                        rightStatusText += toAnsiEscapeColor([0, 255, 127]);
                    }
                    else {
                        if (device.power.batteryLevel / 100 < 0.25) {
                            rightStatusText += toAnsiEscapeColor([255, 0, 85]);
                        }
                    }
                    rightStatusText += "".concat(getBatteryLevelCharacter(device.power.batteryLevel / 100), " ").concat(Math.round(100 * device.power.batteryLevel / 100), "%\u001B[0m");
                }
                else
                    rightStatusText += "-----";
                rightStatusText = "".concat(" ".repeat(35 - leftStatusText.length)).concat(rightStatusText);
                console.log("".concat(statusColor, "\u25CF\u001B[0m").concat(leftStatusText).concat(rightStatusText));
            }
        });
    });
    clientRequest.end();
}
setInterval(update, 1000);
setTimeout(update, 2000);
//# sourceMappingURL=serverHost.js.map
