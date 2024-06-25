
export interface StateMachineInterface {
    initData(): Promise<void>

    checkStateChange(stateNow: State, newState: State): Promise<boolean>
}

export interface State {

    name: string

    stateIn(): Promise<boolean>

    stateOut(): Promise<boolean>
}

export interface StateMap {
    states: {
        [key: string]: State
    }
}

export class StateMachine {

    public smi: StateMachineInterface

    public stateMap: StateMap

    public initing: boolean = false
    
    public running: boolean = false

    public stateNow: State | undefined

    constructor (smi: StateMachineInterface, stateMap: StateMap) {
        this.smi = smi

        this.stateMap = stateMap
    }

    public start = async (firstState: string) => {

        if(this.initing == true || this.running == true) {
            console.log('already start')
            return
        }

        if (this.stateMap.states[firstState] == undefined) {
            throw new Error(`state not found: ${firstState}`);
        }

        this.initing = true
        await this.smi.initData()

        this.stateNow = this.stateMap.states[firstState]
        await this.stateNow?.stateIn()

        this.running = true
        this.initing = false
    }

    public changeState = (stateName: string) => {

        if (this.stateMap.states[stateName] == undefined) {
            throw new Error(`state not found: ${stateName}`);
        }

        this.doChangeState(stateName)
    }

    private doChangeState = async (stateName: string) => {

        if(this.stateNow == undefined){
            throw new Error(`unknow error state now is undefined`);
        }

        const newState = this.stateMap.states[stateName]
        const canChange = await this.smi.checkStateChange(this.stateNow, newState)

        if (canChange) {
            const outStatus = await this.stateNow?.stateOut()
            if (outStatus == false) {
                throw new Error(`stateOut failed: ${this.stateNow.name}, next state: ${stateName}`);
            }
            this.stateNow = newState

            const inStatus = await this.stateNow?.stateIn()
            if (inStatus == false) {
                throw new Error(`stateIn failed: ${this.stateNow.name}`);
            }
        }
    }
}

