import { Color } from "./art.js";

export class StatusCard{
    title: string = "Example";
    description: string = "I am retardI am retardI am retardI am retard";
    image: string = "./example.jpeg";
    color: Color = new Color(0, 170, 255);
    posted: number = Date.now()

    constructor(title: string = "Example", description: string = "I am retarded", image: string = "./example.jpeg", color: Color = new Color(0, 170, 255)){
        this.title = title;
        this.description = description;
        this.image = image;
        this.color = color;
    }
}

export class SpotifyStatus{
    trackName: string = "";
    artistName: string = "";
    albumName: string = "";
    spotifyArtworkURL: string = "";
    id: string = "";
    playbackState = {
        playing: false,
        timePosition: 0,
        timeLength: 0,
        timeSinceLastUpdate: 0
    }
}
