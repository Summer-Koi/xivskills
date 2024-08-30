import { Skill } from './skill';

export class Resource {
    name: string;
    max: number;
    current: number;

    constructor(name: string, max: number, current: number) {
        this.name = name;
        this.max = max;
        this.current = current;
    }

    public add(add: number) {
        this.current += add;
        if (this.current > this.max) {
            this.current = this.max;
        }
    }

    public sub(sub: number) {
        this.current -= sub;
        if (this.current < 0) {
            this.current = 0;
        }
    }

    public clear() {
        this.current = 0;
    }
}