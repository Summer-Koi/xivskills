export class Buff {
    name: string;
    duration: number;
    constructor(name: string, duration: number) {
        this.name = name;
        this.duration = duration;
    }
    active: boolean = false;

    public activate() {
        this.active = true;
    }

    public deactivate() {
        this.active = false;
    }
}
