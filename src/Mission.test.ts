import { Mission, mission } from './index'

test('run', async () => {

    let step2 = false

    mission.create([
        {
            stepName: 'step1',
            dispose: async (mission: Mission, tags: any[]) => {
                mission.goNext()
            }
        },
        {
            stepName: 'step2',
            dispose: async (mission: Mission, tags: any[]) => {
                step2 = true
            }
        }
    ]).start()

    await sleep(500)
    
    expect(step2).toBe(true)
    
    
})

test('jump', async () => {
    let step3 = false

    mission.create([
        {
            stepName: 'step1',
            dispose: async (mission: Mission, tags: any[]) => {

                mission.jump('step2')
            }
        },
        {
            stepName: 'step2',
            dispose: async (mission: Mission, tags: any[]) => {
                mission.goNext()
            }
        },
        {
            stepName: 'step3',
            dispose: async (mission: Mission, tags: any[]) => {
                step3 = true
            }
        }
    ]).start()

    await sleep(500)
    expect(step3).toBe(true)
})

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}