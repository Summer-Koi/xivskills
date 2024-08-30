import { GameHandle } from "./gameHandle";
import { Effect } from "./effect";

export enum SkillCategory {
    WeaponSkill, Ability, Spell
}

export type CastCondition = (gameHandle: GameHandle) => boolean;
export type DerivedSkill = {
    skill: Skill,
    priority: number,  // priority of derived skill, higher priority will be casted
    condition: CastCondition,
}

export class Skill {
    name: string;
    description: string;
    category: SkillCategory;
    derived: boolean;       // whether this skill is derived, derived skill will not be casted directly

    recastTime: number;     // recastTime * GCD = real recast time
    castTime: number;       // castTime * GCD = real cast time

    selfRecast: boolean;    // independent recast 独立复唱

    constructor(name: string, 
                description: string,
                category: SkillCategory,
                derived: boolean = false,
                recastTime: number = 1,     // GCDs
                castTime: number = 0,       // GCDs
                selfRecast: boolean = false)
    {
        this.name = name;
        this.description = description;
        this.category = category;
        this.derived = derived;
        this.recastTime = recastTime;
        this.castTime = castTime;
        this.selfRecast = selfRecast;
    }

    /* game handel */
    private _gameHandle: GameHandle | undefined;
    attach(gameHandle: GameHandle) {
        this._gameHandle = gameHandle;
        for (let effect of this._castEffectList) {
            effect.attach(gameHandle);
        }
    }

    /* Derived Skill */
    _derivedSkills: DerivedSkill[] = [];
    addDerivedSkill(...derivedSkill: DerivedSkill[]) {
        this._derivedSkills.push(...derivedSkill);
    }

    /* Cast Condition */
    _castConditionList: CastCondition[] = [];
    addCastCondition(...c: CastCondition[]) {
        this._castConditionList.push(...c);
    }

    /* Cast Effect */
    _castEffectList: Effect[] = [];
    addCastEffect(...e: Effect[]) {
        this._castEffectList.push(...e);
    }

}