import { GameHandle } from "../xivsim/gameHandle";
import { Skill, Combo, Buff, Resource } from '../xivsim'

export interface Job {
    name: string;
    combos: { [key: string]: Combo };
    skills: { [key: string]: Skill };
    buffs: { [key: string]: Buff};
    resources: { [key: string]: Resource };
}

export const bindJobWithGameHandle = (job: Job, gameHandle: GameHandle) => {
    Object.values(job.skills).forEach(skill => {
        skill.gameHandle = gameHandle;
    });
    gameHandle.combos = Object.values(job.combos);
    gameHandle.buffs = job.buffs;
}