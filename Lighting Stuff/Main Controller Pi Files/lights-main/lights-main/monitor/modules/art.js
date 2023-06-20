/**
 * Author: Joshua Null (TheJades)
 *
 * Art module. basic helpers for 2d context drawers.
 * heve fun
 */
class WrapEngine {
    static attemptWrap(drawingContext, text, maxWidth) {
        // if (text == "")
        //     return "";
        // let wrapKey = `FONT:${drawingContext.font}\0;TEXT:${text}`;
        // if (this.wrapCache.has(wrapKey)){
        //     return this.wrapCache.get(wrapKey)!;
        // }
        let currentLines = text.split(/\n/);
        let newLines = [];
        for (let line of currentLines) {
            let currentWidth = 0;
            let newLine = "";
            let splittableWords = line.split(/ /);
            for (let word of splittableWords) {
                let wordWidth = drawingContext.measureText(`${word} `).width;
                if (wordWidth + currentWidth > maxWidth) {
                    newLines.push(newLine);
                    currentWidth = 0;
                    newLine = "";
                }
                currentWidth += wordWidth;
                newLine += `${word} `;
            }
            if (newLine.length > 0)
                newLines.push(newLine);
        }
        let result = newLines.join("\n");
        // WrapEngine.wrapCache.set(wrapKey, result);
        return result;
    }
    static fillTextLN(drawingContext, text, x, y) {
        let lines = text.split(/\n/);
        let currentHeight = 0;
        for (let line of lines) {
            drawingContext.fillText(line, x, y + currentHeight);
            let measurementResults = drawingContext.measureText(line);
            currentHeight += measurementResults.actualBoundingBoxDescent;
        }
    }
    static measureHeight(drawingContext, text) {
        if (text.length == 0)
            return 0;
        let lines = text.split(/\n/);
        let currentHeight = 0;
        for (let line of lines) {
            let measurementResults = drawingContext.measureText(line);
            currentHeight += measurementResults.actualBoundingBoxDescent;
        }
        return currentHeight;
    }
}
WrapEngine.wrapCache = new Map();
export { WrapEngine };
export class Color {
    static fromArray(array) {
        return new Color(array[0], array[1], array[2], array[3]);
    }
    static immediate(r, g, b, a = 1) {
        return new Color(r, g, b, a).toStyle();
    }
    constructor(r, g, b, a = 1) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 1;
        this.r = Math.min(255, Math.max(0, r));
        this.g = Math.min(255, Math.max(0, g));
        this.b = Math.min(255, Math.max(0, b));
        this.a = a;
    }
    toStyle() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}
export class ColorMixer {
    static lerp(a, b, lerpFactor) {
        return new Color(a.r + (b.r - a.r) * lerpFactor, a.g + (b.g - a.g) * lerpFactor, a.b + (b.b - a.b) * lerpFactor, a.a + (b.a - a.a) * lerpFactor);
    }
    static darken(a) {
        return ColorMixer.lerp(a, new Color(0, 0, 0, a.a), 0.25);
    }
    static brighten(a) {
        return ColorMixer.lerp(a, new Color(255, 255, 255, a.a), 0.25);
    }
    static newOpacity(a, alpha) {
        return new Color(a.r, a.g, a.b, alpha);
    }
}
export class ExtraShapes {
    static pathSRect(drawingContext, x, y, width, height, radius, close = true) {
        radius = Math.min(radius, Math.min(width, height) / 2);
        drawingContext.beginPath();
        drawingContext.moveTo(x, y + radius);
        drawingContext.arc(x + radius, y + radius, radius, Math.PI, 3 * Math.PI / 2, false);
        drawingContext.arc(x + width - radius, y + radius, radius, 3 * Math.PI / 2, 0, false);
        drawingContext.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2, false);
        drawingContext.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI, false);
        if (close)
            drawingContext.closePath();
    }
}
export class ImageDrawer {
    static drawImage(drawingContext, img, x, y, width, height) {
        let currentImgSize;
        if (img.tagName == "CANVAS") {
            let canvasMedia = img;
            currentImgSize = { width: canvasMedia.width, height: canvasMedia.height };
        }
        else {
            let imageMedia = img;
            currentImgSize = { width: imageMedia.naturalWidth, height: imageMedia.naturalHeight };
        }
        if (currentImgSize.width == 0 || currentImgSize.height == 0) {
            return {
                width: 0,
                height: 0,
                x, y
            };
        }
        height = height || (currentImgSize.height * width / currentImgSize.width);
        drawingContext.translate(x, y);
        drawingContext.scale(width / currentImgSize.width, height / currentImgSize.height);
        drawingContext.drawImage(img, 0, 0);
        drawingContext.scale(currentImgSize.width / width, currentImgSize.height / height);
        drawingContext.translate(-x, -y);
        return {
            width,
            height,
            x,
            y
        };
    }
    static paintImage(fakeDrawningContext, img, color) {
        let currentImgSize;
        if (img.tagName == "CANVAS") {
            let canvasMedia = img;
            currentImgSize = { width: canvasMedia.width, height: canvasMedia.height };
        }
        else {
            let imageMedia = img;
            currentImgSize = { width: imageMedia.naturalWidth, height: imageMedia.naturalHeight };
        }
        fakeDrawningContext.drawImage(img, 0, 0);
        fakeDrawningContext.globalCompositeOperation = "source-in";
        fakeDrawningContext.fillStyle = color.toStyle();
        fakeDrawningContext.fillRect(0, 0, currentImgSize.width, currentImgSize.height);
    }
}
export class Formatter {
    static toTimeString(seconds) {
        return `${seconds / 60 < 10 ? "0" : ""}${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? "0" : ""}${Math.floor(seconds % 60)}`;
    }
}
//# sourceMappingURL=art.js.map