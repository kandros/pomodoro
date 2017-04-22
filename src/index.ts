import * as NanoTimer from 'nanotimer'

interface IOptions {
    onRunningStateChange?: (newVal: boolean, prevVal: boolean) => void,
    onStatusChange?: (newVal: Status, prevVal: Status) => void,
    onTick?: (intervalCount: number) => void,
    onPomodoroStart?: () => void,
    pomodoroInSeconds?: number
    shortBreakInSeconds?: number
    LongBreakInSeconds?: number
}

type Status =
    'pomodoro'
    | 'shortBreak'
    | 'longBreak'
    | 'idle'

export class Pomodoro {
    private _running: boolean = false
    private onRunningStateChange: (newVal: boolean, prevVal: boolean) => void
    private onStatusChange: (newVal: Status, prevVal: Status) => void
    private onTick: (intervalCount: number) => void
    private onPomodoroStart: () => void
    private pomodoroInSeconds: number
    private shortBreakInSeconds: number
    private longBreakInSeconds: number
    private timer
    private _status: Status = 'idle'
    private interval

    get status() {
        return this._status
    }

    set status(newStatus: Status) {
        if (this.onStatusChange) {
            this.onStatusChange(newStatus, this._status)
        }
        this._status = newStatus
    }

    constructor(options: IOptions = {}) {
        this.pomodoroInSeconds = options.pomodoroInSeconds || 25 * 60
        this.shortBreakInSeconds = options.shortBreakInSeconds || 5 * 60
        this.longBreakInSeconds = options.LongBreakInSeconds || 15 * 60
        this.onRunningStateChange = options.onRunningStateChange
        this.onStatusChange = options.onStatusChange
        this.onPomodoroStart = options.onPomodoroStart
        this.onTick = options.onTick
    }

    public startPomodoro() {
        this.status = 'pomodoro'
        const duration = this.pomodoroInSeconds
        this.start(duration)
    }

    public startShortBreak() {
        this.status = 'shortBreak'
        const duration = this.shortBreakInSeconds
        this.start(duration)
    }

    public startLongBreak() {
        this.status = 'longBreak'
        const duration = this.longBreakInSeconds
        this.start(duration)
    }

    public stop() {
        this.status = 'idle'
    }

    get running(): boolean {
        return this._running
    }

    set running(newVal: boolean) {
        if (this.onRunningStateChange) {
            this.onRunningStateChange(newVal, this.running)
        }
        this._running = newVal
    }

    private start(duration: number = this.pomodoroInSeconds) {
        const timer = this.timer = new NanoTimer()

        this.interval = timer.setInterval(() => {
            if (this.onTick) {
                this.onTick(timer.intervalCount)
            }
            if (timer.intervalCount >= duration) {
                timer.clearInterval()
            }
        }, '', '1s', this.stop)

        if (this.onPomodoroStart) {
            this.onPomodoroStart()
        }

        this.running = true
    }
}