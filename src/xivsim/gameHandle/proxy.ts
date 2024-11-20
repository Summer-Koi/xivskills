import { GameHandle } from './gameHandle.ts';
import { Skill } from '../skill.ts';

export class GameHandleProxy {
    gameHandle: GameHandle;
    constructor(gameHandle: GameHandle) {
        this.gameHandle = gameHandle;
    }

    cast(skill: Skill, time: number, derivingCast: boolean = false) {
        this.gameHandle.cast(skill, derivingCast);
    }
}