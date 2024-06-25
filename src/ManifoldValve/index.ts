
export interface ManifoldValveInterface {
    onValveOpen(data: any): Promise<void>
}
export class ManifoldValve {

    valveList: string[]

    outputImp: ManifoldValveInterface

    data: {
        [key: string]: any
    } = {}

    constructor (valveList: string[], outputImp: ManifoldValveInterface) {
        this.valveList = valveList
        this.outputImp = outputImp
    }

    public input = (valveName: string, data: any) => {
        for (const iterator of this.valveList) {
            if (iterator == valveName) {
                this.data[valveName] = data
            }
        }

        this.checkValve()
    }

    private checkValve = () => {
        const readyKeys = Object.keys(this.data)
        let ready = 0

        for (const iterator of this.valveList) {
            if (readyKeys.includes(iterator)) {
                ready++
            }
        }

        if (this.valveList.length == ready) {
            this.outputImp.onValveOpen(this.data)
        }
    }
}
