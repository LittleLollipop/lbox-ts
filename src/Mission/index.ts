
export interface StepDisposer {
    stepName: string

    dispose(mission: Mission, tags: any[]): Promise<void>
}

export class Mission {
    public stepList: StepDisposer[]

    public stepNow: StepDisposer | undefined

    running: boolean = false

    stepRunning: boolean = false
    
    tags: any[] = []

    taskList: string[] = []

    constructor(stepList: StepDisposer[]) {
        this.stepList = stepList
    }

    public start = async () => {
        if (this.running == true) {
            console.log('already started')
            return
        }


        this.stepNow = this.stepList[0]

        this.stepRunning = true
        await this.stepNow.dispose(this, this.tags)
        this.stepRunning = false
        this.tick()
    }

    public goNext = async () => {

        this.taskList.push('next')
    }

    private tick = async () => {

        if (this.stepRunning == true) {
            throw new Error("no concurrency allowed");
        }

        let jumpNum = 0
        for (const iterator of this.taskList) {
            if (iterator != 'next') {
                jumpNum++
            }
        }
        if (jumpNum > 0) {
            if (this.taskList.length != 1) {
                throw new Error(`error task list: ${JSON.stringify(this.taskList)}`);
            }
        }
        
        this.stepRunning = true
        if (this.taskList[0] == 'next') {
            let next = false
            for (const iterator of this.stepList) {
                if (next == true) {
                    this.stepNow = iterator
                    this.taskList = []
                    await this.stepNow.dispose(this, this.tags)
                    next = false
                    break
                } else {
                    if (iterator.stepName == this.stepNow?.stepName) {
                        next = true
                    }
                }
            }
            
            if (next == true) {
                this.running = false
            } else {
                setTimeout(this.tick, 1);
            }
        } else {
            for (const iterator of this.stepList) {
                if (iterator.stepName == this.taskList[0]) {
                    this.stepNow = iterator
                    this.taskList = []
                    await this.stepNow.dispose(this, this.tags)
                }
            }

            if (this.stepNow == this.stepList[this.stepList.length]) {
                this.running = false
            } else {
                setTimeout(this.tick, 1);
            }
        }

        
        this.stepRunning = false

    }

    public jump = async (stepName: string) => {
        for (const iterator of this.stepList) {
            if (iterator.stepName == stepName) {
                this.taskList.push(stepName)
            }
        }
    }

}