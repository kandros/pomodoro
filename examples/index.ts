import {Pomodoro} from '../src'

const pomodoro = new Pomodoro({
    onTick: (xx) => console.log(xx)
})
console.log(pomodoro.status)
pomodoro.startPomodoro()
console.log(pomodoro.status)

