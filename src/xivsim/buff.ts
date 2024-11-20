import { GameHandle } from './gameHandle/index.ts';
import { Skill } from './skill.ts';

/*
BuffHookTarget 的时机如下：
- CAST_BEGIN: 技能最开始，此时还未判定 Derive 和 Condition
- CAST_BEFORE_EFFECT: 技能效果生效前，已经判定 Derive 和 Condition
*/
export enum BuffHookTarget {
    CAST_BEGIN,
    CAST_BEFORE_EFFECT,
    OTHER,
}

export interface SkillCastBuffHook {
    target: BuffHookTarget.CAST_BEGIN | BuffHookTarget.CAST_BEFORE_EFFECT;
    handler: (gameHandle: GameHandle, skill: Skill) => void;
}

interface OtherBuffHook {
    target: BuffHookTarget.OTHER;
    handler: (gameHandle: GameHandle) => void;
}

export type BuffHook = SkillCastBuffHook | OtherBuffHook;

export class Buff {
    name: string;
    hooks: BuffHook[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addHook(hook: BuffHook) {
        this.hooks.push(hook);
    }

    hookOnSkillCast() {}
}

export interface ActiveBuff {
    buff: Buff;
    duration: number;
    startTime: number;
}
