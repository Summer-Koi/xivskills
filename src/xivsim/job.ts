import { Skill } from './skill.ts';
import { Combo } from './combo.ts';
import { Buff } from './buff.ts';
import { Resource } from './resource.ts';

export interface Job {
    name: string;
    combos: { [key: string]: Combo };
    skills: { [key: string]: Skill };
    buffs: { [key: string]: Buff };
    resources: { [key: string]: Resource };
}
