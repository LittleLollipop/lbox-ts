import { machine, State } from ".";

test('state out', async () => {
    let stateOut = false

    const sm = machine.create({
        initData: async () => {

        },
        checkStateChange: (stateNow: State, newState: State) => new Promise<boolean>((resolve, reject) => {
            resolve(true)
        })
    }, {
        states: {
            state1: {
                name: 'state1',
                stateIn: () => new Promise<boolean>((resolve, reject) => {
                    resolve(true)
                }),
                stateOut: () => new Promise<boolean>((resolve, reject) => {
                    stateOut = true
                    resolve(true)
                })
            },
            state2: {
                name: 'state2',
                stateIn: () => new Promise<boolean>((resolve, reject) => {
                    resolve(true)
                }),
                stateOut: () => new Promise<boolean>((resolve, reject) => {
                    
                })
            }
        }
    })

    await sm.start('state1')
    sm.changeState('state2')

    await sleep(500)
    expect(stateOut).toBe(true)
})

test('state in', async () => {
    let stateIn = false

    const sm = machine.create({
        initData: async () => {

        },
        checkStateChange: (stateNow: State, newState: State) => new Promise<boolean>((resolve, reject) => {
            resolve(true)
        })
    }, {
        states: {
            state1: {
                name: 'state1',
                stateIn: () => new Promise<boolean>((resolve, reject) => {
                    resolve(true)
                }),
                stateOut: () => new Promise<boolean>((resolve, reject) => {
                    resolve(true)
                })
            },
            state2: {
                name: 'state2',
                stateIn: () => new Promise<boolean>((resolve, reject) => {
                    stateIn = true
                    resolve(true)
                }),
                stateOut: () => new Promise<boolean>((resolve, reject) => {
                    
                })
            }
        }
    })

    await sm.start('state1')
    sm.changeState('state2')

    await sleep(500)
    expect(stateIn).toBe(true)
})

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}