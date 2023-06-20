import ChildProcess from "child_process";
import OS from "os";
import HTTPs from "https";

const cert = `-----BEGIN CERTIFICATE-----
MIIGQjCCBCoCCQCt8tI7yxq1QjANBgkqhkiG9w0BAQsFADCB4jELMAkGA1UEBhMC
Q0ExEDAOBgNVBAgMB0FsYmVydGExEDAOBgNVBAcMB0NhbGdhcnkxGjAYBgNVBAoM
EUphZGUgSW5jb3Jwb3JhdGVkMTowOAYDVQQLDDFUaGVKYWRlcydzIENlcnRpZmlj
YXRlIEF1dGhvcml0eSBmb3IgUGVyc29uYWwgVXNlMS0wKwYDVQQDDCRSb290IEF1
dGhvcml0eSBvZiBUaGVKYWRlcydzIE5ldHdvcmsxKDAmBgkqhkiG9w0BCQEWGXRo
ZWphZGVzaXNmYXQ3N0BnbWFpbC5jb20wHhcNMjIwODIyMDU1NTU3WhcNMjcwODIx
MDU1NTU3WjCB4jELMAkGA1UEBhMCQ0ExEDAOBgNVBAgMB0FsYmVydGExEDAOBgNV
BAcMB0NhbGdhcnkxGjAYBgNVBAoMEUphZGUgSW5jb3Jwb3JhdGVkMTowOAYDVQQL
DDFUaGVKYWRlcydzIENlcnRpZmljYXRlIEF1dGhvcml0eSBmb3IgUGVyc29uYWwg
VXNlMS0wKwYDVQQDDCRSb290IEF1dGhvcml0eSBvZiBUaGVKYWRlcydzIE5ldHdv
cmsxKDAmBgkqhkiG9w0BCQEWGXRoZWphZGVzaXNmYXQ3N0BnbWFpbC5jb20wggIi
MA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDFbkt5TQsT2cSQQwW94KIBB1G3
1/Igmw6H+ZVu/wGXOhCGYDhWUq5EZiNQxnPa/sCMl1/zli5qreNd8dL1EKGUhTdI
qK5uXY+N2+vN4j+0WFH+DZxY8LmjEMD3h+ad6+sn4siJmrAsvaYLLjFKF3vHiAJ4
/AXUhCFNPi3o+OwNdrYQNv05K3EDP1RIwwc5HkN3A0/s9Sva3FMjOXv61pecbaaq
JdenX1Ye80fnzE8hISEgP4rXFqoPvzqa/vx9aozyntFVb/U+d76rGAWx9waoRbnu
o8Rbm/cYoAuuk0juCBh6dR2fp0eKhFnVQ2th83UXTIvGAERv8g9kusNKPOdANDsE
z4RUmlLSGMxR6NffeeAWGUP/ZY3eS8Is78ven7VyQXfX7y1ZKuc4zVLFDTRuf9kz
OTVX9bvNqv8mVZV/0Wmh66vxiwzVllM0DPZTYex9aINg8uZSD0YcBv8OpJfnVPjY
lFg7DEszC7/YH8huJxb+I+31ePvaIO8AdFnuPXYKYpVqROdcv+1J2r5+4PUfwLqA
AxSp+yrckYl46e9e/9/1uGVCwwLWMgShER79Tv2PXO5raw5hDZ1DIzxmnflxvTz9
5hSVHdw0r5zvHXyJn0JwCYsdB+yKVDHGG9ZRcwNrXI1WoQo9VdL3rKbzmbpszeF6
3DV816S77gG+OPpMHQIDAQABMA0GCSqGSIb3DQEBCwUAA4ICAQBOciEBxA4czjaG
01EqvT7SJ5F2TqcsHIm70W5d5b1eM9umGMnlM09BMyEvTGYrDqE6UJKu5FHpccrE
Zd7kkuoCSXr5ed4iHvt0d6UcrMOVgs9lPOenol4IGOhlq5P76a4oxEXn57J7k56y
qYGHZbs5rXGZzB72mqD6zYZwrnUd28UOneWdptdt+ZBH4R0Ouljjl3xJ7cZXON2u
ppMG4KpQpLYRdcd4GYQ2z1CFD9Sw1XrVphGUquz7AH3T3mC1/NZ2/6J9tbRW36D6
hBfj7UW3pXHZiDxwsAPbm4A9HXhboI/occruIh+EDxCFRg0bqbzroVn8+4LFNoO6
UH2IXR8guWz0MAnZLxMO/6ktgwYqH1CVt6rZrNObqGgi+PC4afmqyUPjgMThLY+v
olTp7za+PhyVS03Wt4n+rSbxFVXSSkx9rcs0va8RBJDypXoQFeNxA4TB7+4D+FUN
Pxxi2TgXHrCYPr+M9ZYO8SPpaIAE8G6OQt9zkhn4QMt2YZTPgyUxPk9IrpaEK4vd
7gKDnZyBH5B1vFiv17liJx+vXdRjL27h05nnb4dkMRCpj97mMAEBnsw4SRCFQ6J2
ScsMHmXJLcTmVzGNiF8M45iZipxIa8/UYBWhUpPe10nBzywS1LFLPz8vcK7/DQ/W
o6O53P1YdA0x+Lfox1012C9h+39gaw==
-----END CERTIFICATE-----`;

const currentDeviceInfo:{
    deviceName: string;
    deviceType: string;
    power: {
        batteryLevel: number;
        charging: boolean;
        supported: boolean;
    };
    temperature: {
        temperatureLevel: number;
        supported: boolean;
    };
    cpuUsage: {
        cpuUsage: number;
        supported: boolean;
    };
    extraInformation: {
        spotifyState?:{
            trackName: string,
            artistName: string,
            albumName: string,
            spotifyArtworkURL: string,
            id: string,
            playbackState:{
                playing: boolean,
                timePosition: number,
                timeLength: number,
                timeSinceLastUpdate: number
            }
        },
        airpod?:{
            leftPower: number | null,
            rightPower: number | null,
            casePower: number | null
        }
    };
} = {
    deviceName: "",
    deviceType: "m1",
    power: {
        batteryLevel: -1,
        charging: false,
        supported: false,
    },
    temperature:{
        temperatureLevel: -1,
        supported: false,
    },
    cpuUsage:{
        cpuUsage: -1,
        supported: false  
    },
    extraInformation:{

    }
}

const connectionStatus = {
    lastConnectedSuccessfully: false,
    errorReason: "",
    timeSinceConnectionStatusChange: Date.now()
}

function sendDeviceInformation(){
    return new Promise<void>((accept)=>{
        let request = HTTPs.request({
            hostname: "jades.dev",
            path: `/reportDeviceInformation?authenticationKey=${encodeURIComponent("some more keys")}`,
            port: 38492,
            method: "POST",
            ca: cert,
            headers: {
                "Content-Type": "application/json",
            }
        }, (message)=>{
            accept();   
        })
        request.once("finish", ()=>{
            if (connectionStatus.lastConnectedSuccessfully != true){
                connectionStatus.lastConnectedSuccessfully = true;
                connectionStatus.timeSinceConnectionStatusChange = Date.now();
                console.log(`Successfully communicated with Jade Loader Sync Server!~\nConnected since: ${new Date().toLocaleString()}\n`);
            }
        });
        request.once("error", (error)=>{
            if (connectionStatus.lastConnectedSuccessfully != false || connectionStatus.errorReason != String(error)){
                connectionStatus.errorReason = String(error);
                connectionStatus.lastConnectedSuccessfully = false;
                connectionStatus.timeSinceConnectionStatusChange = Date.now();
                console.warn(`An error has occured communicating with Jade Loader Sync Server!~\nLost Conection since: ${new Date().toLocaleString()}\nError:${error}\n`);
            }
        });
        request.write(JSON.stringify(currentDeviceInfo));
        request.end();
    });
}

function firstInterval(func: ()=>(void)){
    func();
    return func;
}

class TermuxMonitor{
    static start(){

        currentDeviceInfo.deviceType = "Linux/Android/Termux";

        currentDeviceInfo.cpuUsage.supported = true;
        currentDeviceInfo.temperature.supported = true;
        currentDeviceInfo.power.supported = true;

        setInterval(firstInterval(()=>{
            ChildProcess.exec("top -n 1", function (error, output) {
                if (output) {
                    let totalCPUUsage = 0;
                    let matches = output.match(/^.+\d+(?:\.\d+)?M +\d+(?:\.\d+)?M (?:S|R) + (\d+(?:\.\d+)?)/gm);
                    for (let matchedString of matches!) {
                        let cpuUsage_1 = Number((matchedString.match(/^.+\d+(?:\.\d+)?M +\d+(?:\.\d+)?M (?:S|R) + (\d+(?:\.\d+)?)/) || [0, 0])[1]);
                        totalCPUUsage += cpuUsage_1;
                    }
                    let cpuUsage_2 = totalCPUUsage / 800;

                    currentDeviceInfo.cpuUsage.cpuUsage = cpuUsage_2;
                }
            });
        }), 1000);
        setInterval(firstInterval(()=>{
            ChildProcess.exec("termux-battery-status", function (error, output) {
                if (output) {
                    let batteryStatus = JSON.parse(output);

                    currentDeviceInfo.temperature.temperatureLevel = batteryStatus.temperature;
                    currentDeviceInfo.power.charging = batteryStatus.plugged == "PLUGGED_AC";
                    currentDeviceInfo.power.batteryLevel = batteryStatus.percentage;
                }
            });
        }), 1000);
    }
}

class LinuxDesktopMonitor{
    static start(){

        currentDeviceInfo.cpuUsage.supported = true;
        currentDeviceInfo.deviceType = "Linux/KDENeon";
        currentDeviceInfo.temperature.supported = true;

        let previousCPUUsage = OS.cpus();

        currentDeviceInfo.cpuUsage.supported = true;

        let temperatureMonitor = ChildProcess.spawn("dstat", ["--nocolor", "--thermal"]);

        setInterval(firstInterval(()=>{

            let currentCPUUsage = OS.cpus();

            let acculumatedCPUTimes = {
                sys: 0,
                idle: 0,
                user: 0
            };

            for (let i = 0;i<currentCPUUsage.length;i++){
                acculumatedCPUTimes.sys += currentCPUUsage[i].times.sys - previousCPUUsage[i].times.sys;
                acculumatedCPUTimes.idle += currentCPUUsage[i].times.idle - previousCPUUsage[i].times.idle;
                acculumatedCPUTimes.user += currentCPUUsage[i].times.user - previousCPUUsage[i].times.user;
            }
            
            previousCPUUsage = currentCPUUsage;

            let percentageUsed = (acculumatedCPUTimes.sys + acculumatedCPUTimes.user) / (acculumatedCPUTimes.sys + acculumatedCPUTimes.idle + acculumatedCPUTimes.user);

            currentDeviceInfo.cpuUsage.cpuUsage = percentageUsed * 100;

        }), 1000);

        temperatureMonitor.stdout.on("data", (raw_data)=>{
            let data = String(raw_data).split(/  /);

            if (data[2] && isNaN(Number(data[2])) == false){
                currentDeviceInfo.temperature.temperatureLevel = Number(data[2]);
            }
        });
    }
}
class GCloudMonitor{
    static start(){

        currentDeviceInfo.cpuUsage.supported = true;
        currentDeviceInfo.deviceType = "Linux/N/A";
        currentDeviceInfo.temperature.supported = true;

        let previousCPUUsage = OS.cpus();

        currentDeviceInfo.cpuUsage.supported = true;


        setInterval(firstInterval(()=>{

            let currentCPUUsage = OS.cpus();

            let acculumatedCPUTimes = {
                sys: 0,
                idle: 0,
                user: 0
            };

            for (let i = 0;i<currentCPUUsage.length;i++){
                acculumatedCPUTimes.sys += currentCPUUsage[i].times.sys - previousCPUUsage[i].times.sys;
                acculumatedCPUTimes.idle += currentCPUUsage[i].times.idle - previousCPUUsage[i].times.idle;
                acculumatedCPUTimes.user += currentCPUUsage[i].times.user - previousCPUUsage[i].times.user;
            }
            
            previousCPUUsage = currentCPUUsage;

            let percentageUsed = (acculumatedCPUTimes.sys + acculumatedCPUTimes.user) / (acculumatedCPUTimes.sys + acculumatedCPUTimes.idle + acculumatedCPUTimes.user);

            currentDeviceInfo.cpuUsage.cpuUsage = percentageUsed * 100;

        }), 1000);
    }
}

class PersonalSystem{
    static start(){
        currentDeviceInfo.extraInformation.spotifyState = {
            trackName: "",
            artistName: "",
            albumName: "",
            spotifyArtworkURL: "",
            id: "",
            playbackState: {
                playing: false,
                timePosition: 0,
                timeLength: 0,
                timeSinceLastUpdate: 0
            }
        }

        currentDeviceInfo.extraInformation.airpod = {
            leftPower: null,
            rightPower: null,
            casePower: null,
        }

        setInterval(firstInterval(()=>{
            ChildProcess.exec(`osascript -e 'tell application "Spotify"' -e '(get name of current track) & "|" & (get album of current track) & "|" & (get artist of current track) & "|" & (get artwork url of current track) & "|" & (get id of current track) & "|" & (get player state) & "|" & (get player position) & "|" & (get duration of current track)' -e 'end tell'`, (error, data)=>{
                if (error)
                    return;


                let parsedData = data.split(/\|/);
                let spotifyState = currentDeviceInfo.extraInformation.spotifyState;
                spotifyState!.trackName = parsedData[0];
                spotifyState!.albumName = parsedData[1];
                spotifyState!.artistName = parsedData[2];
                spotifyState!.spotifyArtworkURL = parsedData[3];
                spotifyState!.id = parsedData[4];
                spotifyState!.playbackState.playing = parsedData[5] == "playing";
                spotifyState!.playbackState.timePosition = Number(parsedData[6]);
                spotifyState!.playbackState.timeLength = Number(parsedData[7]) / 1000;
                spotifyState!.playbackState.timeSinceLastUpdate = Date.now();
            });
        }), 5000);

        setInterval(firstInterval(()=>{
            ChildProcess.exec("system_profiler SPBluetoothDataType", (error, data)=>{
                let leftBatteryLevel = Number((data.match(/Left Battery Level: (\d+)%/) || [0, -1])[1]);
                let rightBatteryLevel = Number((data.match(/Right Battery Level: (\d+)%/) || [0, -1])[1]);
                let caseBatteryLevel = Number((data.match(/Case Battery Level: (\d+)%/) || [0, -1])[1]);

                let airpodState = currentDeviceInfo.extraInformation.airpod;

                if (leftBatteryLevel != -1)
                    airpodState!.leftPower = leftBatteryLevel;
                if (rightBatteryLevel != -1)
                    airpodState!.rightPower = rightBatteryLevel;
                if (caseBatteryLevel != -1)
                    airpodState!.casePower = caseBatteryLevel;
            })
           
        }), 10000);
    }
}

class M1Monitor{
    static start(){

        currentDeviceInfo.cpuUsage.supported = true;
        currentDeviceInfo.power.supported = true;
        currentDeviceInfo.deviceType = "Darwin/macOS";
        currentDeviceInfo.temperature.supported = true;

        let temperatureMonitor = ChildProcess.spawn("./m1/temp_sensor");

        let previousCPUUsage = OS.cpus();

        setInterval(firstInterval(()=>{
            ChildProcess.exec("system_profiler SPPowerDataType", (error, data)=>{
                let profileData = String(data);

                currentDeviceInfo.power.charging = profileData.match(/Connected: Yes/) != null;

                currentDeviceInfo.power.batteryLevel = Number(profileData.match(/State of Charge \(%\): (\d+)/)![1]);
            });
        }), 2000);
        
        setInterval(firstInterval(()=>{

            let currentCPUUsage = OS.cpus();

            let acculumatedCPUTimes = {
                sys: 0,
                idle: 0,
                user: 0
            };

            for (let i = 0;i<currentCPUUsage.length;i++){
                acculumatedCPUTimes.sys += currentCPUUsage[i].times.sys - previousCPUUsage[i].times.sys;
                acculumatedCPUTimes.idle += currentCPUUsage[i].times.idle - previousCPUUsage[i].times.idle;
                acculumatedCPUTimes.user += currentCPUUsage[i].times.user - previousCPUUsage[i].times.user;
            }
            
            previousCPUUsage = currentCPUUsage;

            let percentageUsed = (acculumatedCPUTimes.sys + acculumatedCPUTimes.user) / (acculumatedCPUTimes.sys + acculumatedCPUTimes.idle + acculumatedCPUTimes.user);

            currentDeviceInfo.cpuUsage.cpuUsage = percentageUsed * 100;

        }), 1000);

        let temperatureLookupSensors: string[] = [];
        let temperatureSensors = new Map<string, number>();

        temperatureMonitor.stdout.once("data", (data)=>{
            let avaliableSensors = String(data).split(/, ?/);
            avaliableSensors.splice(avaliableSensors.length - 1, 1);
            
            for (let sensor of avaliableSensors){
                temperatureLookupSensors.push(sensor);
                temperatureSensors.set(sensor, 0);
            }

            temperatureMonitor.stdout.on("data", (data)=>{
                let sensorData = String(data).split(/, ?/);
                sensorData.splice(sensorData.length - 1, 1);

                let index = 0;
                for (let reading of sensorData){
                    temperatureSensors.set(temperatureLookupSensors[index++], Number(reading));
                }

                currentDeviceInfo.temperature.temperatureLevel = temperatureSensors.get("PMGR SOC Die Temp Sensor1")!;
            })


        });
    }
}


switch(OS.hostname()){
    case "TheJadess-Bluebook-Air.local":{
        currentDeviceInfo.deviceName = "TheJades's BlueBook Air";
        M1Monitor.start();
        PersonalSystem.start();
        break;
    }
    case "jade-mains":{
        currentDeviceInfo.deviceName = "GCloud Server";
        GCloudMonitor.start();
        break;
    }
    case "jadenarium-server":{
        currentDeviceInfo.deviceName = "Jadenarium Server";
        LinuxDesktopMonitor.start();
        break;
    }
    case "localhost":{
        if (OS.userInfo().username == "u0_a188"){  
            currentDeviceInfo.deviceName = "TheJades's Terminal";
            TermuxMonitor.start();
            break;
        }
    }
    default:{
        console.error("Failed to initialize OS Specific Sensors!");
        process.exit(0);
    }
}

console.log(`Determined the device as ${currentDeviceInfo.deviceName}`);
setTimeout(() => {
    sendDeviceInformation();
    setInterval(sendDeviceInformation, 10000);
}, 2000);