export class Spawner {
    constructor(functio, timer) {
        this.function = functio;
        this.timer = timer;
        this.intervalId = null;
    }

    startSpawn() {
        if (!this.intervalId) {
            this.intervalId = setInterval(this.function, this.timer);
        }
    }

    clearSpawn() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}