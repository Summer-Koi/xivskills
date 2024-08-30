import { Skill } from './skill';

export class Resource {
    name: string;
    max: number;
    min: number;
    current: number;

    constructor(name: string, max: number, current: number, min: number = 0) {
        this.name = name;
        this.max = max;
        this.current = current;
        this.min = min;
    }

    public change(delta: number) {
        this.current += delta;
        if (this.current > this.max) {
            this.current = this.max;
        }
        if (this.current < this.min) {
            this.current = this.min;
        }
    }

    public setToMin() {
        this.current = this.min;
    }

    public setToMax() {
        this.current = this.max;
    }
}