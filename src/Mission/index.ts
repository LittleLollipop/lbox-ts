
export interface StepDisposer {
    stepName: string

    dispose(mission: Mission, tags: any[]): Promise<void>
}

export class Mission {
    public stepList: StepDisposer[]

    public stepNow: StepDisposer | undefined

    running: boolean = false
    tags: any[] = []

    constructor(stepList: StepDisposer[]) {
        this.stepList = stepList
    }

    public start = async () => {
        if (this.running == true) {
            console.log('already started')
            return
        }

        this.stepNow = this.stepList[0]
        await this.stepNow.dispose(this, this.tags)
    }

    public goNext = async () => {

        let next = false
        for (const iterator of this.stepList) {
            if (next == true) {
                this.stepNow = iterator
                this.stepNow.dispose(this, this.tags)
                next = false
                return 
            } else {
                if (iterator.stepName == this.stepNow?.stepName) {
                    next = true
                }
            }
        }
        if (next == true) {
            this.running = false
        }
    }

    public jump = async (stepName: string) => {
        for (const iterator of this.stepList) {
            if (iterator.stepName == stepName) {
                this.stepNow = iterator
                await this.stepNow.dispose(this, this.tags)
            }
        }
    }

}