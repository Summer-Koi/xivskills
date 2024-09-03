/* 一个希望增加的 feature：能够自由地在 Buff 里挂载自定义参数 */

export class Buff {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export interface ActiveBuff {
    buff: Buff;
    duration: number;
    startTime: number;
}
