import { GameHandle } from "./gameHandle";
import { Combo } from "./combo";
import { Buff } from "./buff";
import { Resource } from "./resource";

export enum SkillCategory {
    WeaponSkill, Ability, Spell
}

export class Skill {
    name: string;
    description: string;
    category: SkillCategory;
    recastTime: number;
    castTime: number;
    selfRecast: boolean;

    constructor(name: string, 
                description: string,
                category: SkillCategory,
                recastTime: number,
                castTime: number,
                selfRecast: boolean)
    {
        this.name = name;
        this.description = description;
        this.category = category;
        this.recastTime = recastTime;
        this.castTime = castTime;
        this.selfRecast = selfRecast;
    }

    /* game handel */
    private _gameHandle: GameHandle | undefined;
    public set gameHandle(gameHandle: GameHandle) {
        this._gameHandle = gameHandle;
    }

    /* potency in skill description */
    private _rawPotencyF: () => number = ConstantPotency(0);
    public get rawPotency() {
        return this._rawPotencyF();
    }
    public set rawPotencyF(potencyF: () => number) {
        this._rawPotencyF = potencyF;
    }

    cast() {
        if (this._gameHandle == undefined) {
            throw new Error('GameHandle is not set')
        }
        
        /* effects */
        console.log(this.rawPotency)

        /* handle combo states */
        this._gameHandle.comboNextStep(this);
    }
}

export function ConstantPotency(potency: number) {
    return () => {
        return potency;
    }
}

export function ComboSuccessPotency(combo: Combo, skill: Skill, basicPotency: number, successPotency: number) {
    return () => {
        if (combo.checkCombo(skill)) {
            return successPotency;
        }
        return basicPotency
    }
}
