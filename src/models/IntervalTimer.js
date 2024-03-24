export default class IntervalTimer {
    constructor(workTimer, restTimer, rounds) {
        this.workTimer = workTimer;
        this.restTimer = restTimer;
        this.rounds = rounds;
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
    }


}