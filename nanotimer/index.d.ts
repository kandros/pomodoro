// Type definitions for nanotimer 0.3.14
// Project: [~THE PROJECT NAME~]
// Definitions by: jaga santagostino <jagasantagostino.com>

/*~ This is the module template file for class modules.
 *~ You should rename it to index.d.ts and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

export = NanoTimer

declare class NanoTimer {
    constructor(log?: boolean)

    // Time reference variables
    intervalT1: null
    timeOutT1: null
    intervalCount: 1
    // Deferred reference indicator variables.  Indicate whether the timer used/will use the deferred call. ie - delay/interval > 25ms
    deferredInterval: false
    deferredTimeout: false
    // Deferred reference variables.  Used to clear the native js timeOut calls
    deferredTimeoutRef: null
    deferredIntervalRef: null
    // Callback reference variables.  Used to be able to still successfully call callbacks when timeouts or intervals are cleared.
    timeoutCallbackRef: null
    intervalCallbackRef: null
    // Immediate reference variables. Used to clear functions scheduled with setImmediate from running in the event timeout/interval is cleared.
    timeoutImmediateRef: null
    intervalImmediateRef: null
    intervalErrorChecked: false
    intervalType: ''
    timeoutTriggered: false
    logging: boolean

    // time: (task: () => any, args: any[], format: number, callback?: () => any) => number
    // setInterval: (task: () => any, args: any[], interval: number, callback?: () => any) => void
    // setTimeout: (task: () => any, args: any[], delay: number, callback?: () => any) => void
    clearInterval: () => void
    clearTimeout: () => void
}