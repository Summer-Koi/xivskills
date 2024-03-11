import { GameHandle } from "../xivsim/gameHandle";
import { Skill, Combo, Buff, Resource } from '../xivsim'

export interface Job {
    name: string;
    combos: Combo[];
    skills: Skill[];
    buffs: Buff[];
    resources: Resource[];
}

export const bindJobWithGameHandle = (job: Job, gameHandle: GameHandle) => {
    job.skills.forEach(skill => {
        skill.gameHandle = gameHandle;
    });
    gameHandle.combos = job.combos;
}