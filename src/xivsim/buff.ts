/* 一个希望增加的 feature：能够自由地在 Buff 里挂载自定义参数 */

export class Buff {
    name: string;
    duration: number;
    stack: number = 0;

    constructor(name: string, duration: number) {
        this.name = name;
        this.duration = duration;
    }
    active: boolean = false;
    startTime: number = 0;

    public activate() {
        this.active = true;
    }

    public deactivate() {
        this.active = false;
    }
}
