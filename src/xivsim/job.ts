import { Skill } from './skill';
import { Combo } from './combo';
import { Buff } from './buff';
import { Resource } from './resource';

export interface Job {
    name: string;
    combos: { [key: string]: Combo };
    skills: { [key: string]: Skill };
    buffs: { [key: string]: Buff};
    resources: { [key: string]: Resource };
}