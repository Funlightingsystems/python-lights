import { Color } from "./art.js";
export class StatusCard {
    constructor(title = "Example", description = "I am retarded", image = "./example.jpeg", color = new Color(0, 170, 255)) {
        this.title = "Example";
        this.description = "I am retardI am retardI am retardI am retard";
        this.image = "./example.jpeg";
        this.color = new Color(0, 170, 255);
        this.posted = Date.now();
        this.title = title;
        this.description = description;
        this.image = image;
        this.color = color;
    }
}
export class SpotifyStatus {
    constructor() {
        this.trackName = "";
        this.artistName = "";
        this.albumName = "";
        this.spotifyArtworkURL = "";
        this.id = "";
        this.playbackState = {
            playing: false,
            timePosition: 0,
            timeLength: 0,
            timeSinceLastUpdate: 0
        };
    }
}
//# sourceMappingURL=classes.js.map