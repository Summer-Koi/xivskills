import { GameHandle } from "./gameHandle";
import { Combo } from "./combo";
import { Buff } from "./buff";
import { Resource } from "./resource";

export enum SkillCategory {
    WeaponSkill, Ability, Spell
}

export type CastEffect = (skill: Skill) => void;
export type CastCondition = (skill: Skill) => boolean;

export type DerivedSkill = {
    skill: Skill,
    condition: CastCondition,
}

export class Skill {
    name: string;
    description: string;
    category: SkillCategory;

    recastTime: number;     // recastTime * GCD = real recast time
    castTime: number;       // castTime * GCD = real cast time

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

    /* Derived Skill */
    private _derivedSkills: DerivedSkill[] = [];
    public addDerivedSkill(...derivedSkill: DerivedSkill[]) {
        this._derivedSkills.push(...derivedSkill);
    }

    /* Cast Condition */
    private _castConditionList: CastCondition[] = [];
    public addCastCondition(c: CastCondition) {
        this._castConditionList.push(c);
    }

    /* Cast Effect */
    private _castEffectList: CastEffect[] = [];
    public addCastEffect(...e: CastEffect[]) {
        this._castEffectList.push(...e);
    }

    cast() {
        if (this._gameHandle == undefined) {
            throw new Error('GameHandle is not set')
        }

        /* handle derived skills */
        for (let derived of this._derivedSkills) {
            if (derived.condition(this)) {
                console.log('Skill derived! ' + derived.skill.name + ' is casted.')
                derived.skill.cast();
                return;
            }
        }

        /* handle cast conditions */
        for (let condition of this._castConditionList) {
            if (!condition(this)) {
                console.log('Cast condition not met');
                return;
            }
        }

        /* handle cast events */
        for (let effect of this._castEffectList) {
            effect(this);
        }

        /* handle combo states */
        this._gameHandle.comboNextStep(this);
    }
}