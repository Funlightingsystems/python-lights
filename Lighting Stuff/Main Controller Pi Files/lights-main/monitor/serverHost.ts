import HTTPs from "https";
import HTTP from "http";
import FileSystem from "fs";

import Express from "express";
import { WebSocketServer } from "ws";

import { setDefault, getConfig} from "./modules/config.js";
import { TransmissionServer } from "./modules/transmission.js";
import { SpotifyStatus } from "./modules/classes.js";

setDefault("Device Authentication Key", "some more keys");
setDefault("User Authentication Key", "some keys");

const expressServer = Express();
const listeningPort = 38492;
const httpsServer = HTTPs.createServer({
    cert: FileSystem.readFileSync("./certificates/thejadesHomeNetwork.JadeLoaderSync.crt"),
    key: FileSystem.readFileSync("./certificates/thejadesHomeNetwork.JadeLoaderSync.key"),
}, expressServer);

const webSocket = new WebSocketServer({
    noServer: true
});

const transmission = new TransmissionServer(webSocket, getConfig("User Authentication Key") as string);

httpsServer.on("upgrade", (request, socket, head)=>{
    webSocket.handleUpgrade(request, socket, head, socket=>{
        webSocket.emit("connection", socket, request);
    });
});

const connectedDeviceCache = new Map<string, boolean>();

httpsServer.listen(listeningPort);

var RawDataInformation: {
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
};

class Device{
    deviceName = "";
    deviceType = "m1";
    power = {
        batteryLevel: -1,
        charging: false,
        supported: false,
    };
    temperature = {
        temperatureLevel: -1,
        supported: false,
    };
    cpuUsage = {
        cpuUsage: -1,
        supported: false  
    };
    timeSinceLastUpdate = Date.now();
}

const connectedDevices: Device[] = [];
const currentSpotifyState = new SpotifyStatus();

expressServer.all("/*", (request, response)=>{
    let address = request.socket.remoteAddress;
    if (address && request.query["authenticationKey"] == getConfig("Device Authentication Key")){
        request.next!();
        if (connectedDeviceCache.get(address) != true){
            connectedDeviceCache.set(address, true);
            console.log(`✅ Marked ${address} as trusted! :)`);
        }
    }else{
        if (address && connectedDeviceCache.get(address) != false){
            connectedDeviceCache.set(address, false);
            console.log(`❌ Denied ${address} as it was untrusted! >:(`);
        }else{
            console.log("An unknown device has connected!");
        }
        response.sendStatus(403);
    }
});


function processDeviceInformation(data: typeof RawDataInformation){
    let deviceName = data.deviceName;
    
    let device = connectedDevices.find(iDevice=>iDevice.deviceName == deviceName);
    
    if (device == null){
        device = new Device();
        connectedDevices.push(device);
    }
    
    if (data.extraInformation.spotifyState){
        let newSpotifyState = data.extraInformation.spotifyState;
        
        currentSpotifyState.albumName = newSpotifyState.albumName;
        currentSpotifyState.artistName = newSpotifyState.artistName;
        currentSpotifyState.playbackState = newSpotifyState.playbackState;
        currentSpotifyState.spotifyArtworkURL = newSpotifyState.spotifyArtworkURL;
        currentSpotifyState.id = newSpotifyState.id;
        currentSpotifyState.trackName = newSpotifyState.trackName;

        transmission.sendMessage("NewSpotifyStatus", currentSpotifyState);
    }
    
    if (data.extraInformation.airpod){
        function createPsuedoAudioDevice(deviceName: string, batteryLevel: number){
            processDeviceInformation({
                deviceName: deviceName,
                deviceType: "null/AirpodDevice",
                power: {
                    batteryLevel: batteryLevel,
                    charging: false,
                    supported: true
                },
                temperature: {
                    temperatureLevel: 0,
                    supported: false
                },
                cpuUsage: {
                    cpuUsage: 0,
                    supported: false
                },
                extraInformation: {}
            })
        }
        
        if (data.extraInformation.airpod.leftPower){
            createPsuedoAudioDevice("TheJades's BluePod Pro (L)", data.extraInformation.airpod.leftPower);
        }
        if (data.extraInformation.airpod.rightPower){
            createPsuedoAudioDevice("TheJades's BluePod Pro (R)", data.extraInformation.airpod.rightPower);
        }
        if (data.extraInformation.airpod.casePower){
            createPsuedoAudioDevice("TheJades's BluePod Pro (Case)", data.extraInformation.airpod.casePower);
        }
    }
    
    device.deviceName = deviceName;
    device.deviceType = data.deviceType;
    device.power = data.power;
    device.cpuUsage = data.cpuUsage;
    device.temperature = data.temperature;
    device.timeSinceLastUpdate = Date.now();
}

expressServer.get("/GetDeviceStatus", (request, response)=>{
    response.send(JSON.stringify(connectedDevices));
});

expressServer.use("/reportDeviceInformation", Express.json({type(req) {
    return true;
},}));
expressServer.post("/reportDeviceInformation", (request, response)=>{
    let data: typeof RawDataInformation = request.body;
    
    processDeviceInformation(data);
    
    response.send();
});

transmission.attachListener("GetSpotifyStatus", ()=>{
    return new Promise((accept)=>{
        accept(currentSpotifyState);
    });
});
transmission.attachListener("GetGeneralStatus", ()=>{
    return new Promise((accept)=>{
        accept({
            SpotifyStatus: currentSpotifyState,
            PersonalStatus: []
        });
    });
});