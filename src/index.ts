import { StateMachine, StateMachineInterface, StateMap } from "./StateMachine";
export { StateMachineInterface, StateMachine, StateMap}


import { Mission, StepDisposer } from "./Mission";
export { Mission, StepDisposer }


import { ManifoldValve, ManifoldValveInterface } from "./ManifoldValve";
export { ManifoldValve, ManifoldValveInterface }

export namespace machine {
    export const create = 
        (smi: StateMachineInterface, stateMap: StateMap) => 
        new StateMachine(smi, stateMap)
}

export namespace mission {
    export const create = 
        (stepList: StepDisposer[]) => new Mission(stepList)
}

export namespace valve {
    export const create = 
        (valveList: string[], outputImp: ManifoldValveInterface) => 
        new ManifoldValve(valveList, outputImp)
}
