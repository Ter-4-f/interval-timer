export default class Timer {
    constructor(minutes, seconds) {
        this.minutes = minutes || 0;
        this.seconds = seconds || 0;
    }

    isFinished () {
        return this.minutes === 0 && this.seconds === 0;
    }

    decrement () {
        this.seconds--;

        if (this.seconds < 0) {
            this.minutes--;
            if (this.minutes < 0) {
                this.minutes = 0;
                this.seconds = 0;
            } else {
                this.seconds = 59;
            }
        }

        return this;
    }

    increment () {
        this.seconds++;

        if (this.seconds === 60) {
            this.seconds = 0;
            this.minutes++;
        }
        return this;
    }
}