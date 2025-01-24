import { valve } from '../dist/index'

test('open valve', () => {

    let open = false

    const manifoldValve = valve.create(['valve1', 'valve2'], {
        onValveOpen: async (data: any) => {
            open = true
        }
    })

    manifoldValve.input('valve1', undefined)
    manifoldValve.input('valve2', undefined)

    expect(open).toBe(true)
})

test('not open valve ', () => {

    let open = false

    const manifoldValve = valve.create(['valve1', 'valve2'], {
        onValveOpen: async (data: any) => {
            open = true
        }
    })

    manifoldValve.input('valve1', undefined)

    expect(open).toBe(false)
})

test('open valve carry data', () => {

    let open = false
    let readData : any | undefined = undefined

    const dataTimeNow = Date.now()

    const manifoldValve = valve.create(['valve1', 'valve2'], {
        onValveOpen: async (data: any) => {
            open = true
            readData = data
        }
    })

    manifoldValve.input('valve1', dataTimeNow)
    manifoldValve.input('valve2', undefined)

    expect(open).toBe(true)
    expect(readData['valve1']).toBe(dataTimeNow)
})
