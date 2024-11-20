import { GameHandle } from './gameHandle/index.ts';
import { Combo } from './combo.ts';
import { Skill } from './skill.ts';
import { Resource } from './resource.ts';
import { Buff } from './buff.ts';

export type EffectLog = {
    type: string;
    detail: string;
    value: number;
};

export abstract class Effect {
    protected _gameHandle: GameHandle | undefined;
    public attach(gameHandle: GameHandle) {
        this._gameHandle = gameHandle;
        return this;
    }
    protected applyWithPreChecks() {
        if (this._gameHandle === undefined) {
            throw new Error('GameHandle not attached');
        }
        return this.doApply(this._gameHandle);
    }
    protected abstract doApply(handle: GameHandle): EffectLog;
    apply(){
        return this.applyWithPreChecks();
    }
}

class DamageEffect extends Effect {
    rawPotency: number;
    constructor(rawPotency: number) {
        super();
        this.rawPotency = rawPotency;
    }
    doApply(handle: GameHandle) {
        let damage = this.rawPotency
        handle.dealFinalDamage(damage);
        return {
            type: 'damage',
            detail: '',
            value: damage,
        }
    }
}

abstract class ResourceEffect extends Effect {
    resource: Resource;
    constructor(resource: Resource) {
        super();
        this.resource = resource;
    }
}

class ResourceChangeEffect extends ResourceEffect {
    delta: number;
    constructor(resource: Resource, delta: number) {
        super(resource);
        this.delta = delta;
    }
    doApply() {
        this.resource.change(this.delta);
        return {
            type: 'resource',
            detail: `resource ${this.resource.name} changed by ${this.delta}`,
            value: this.delta,
        }
    }
}

class ResourceClearEffect extends ResourceEffect {
    doApply() {
        this.resource.setToMin();
        return {
            type: 'resource',
            detail: `resource ${this.resource.name} cleared`,
            value: 0,
        }
    }
}

abstract class BuffEffect extends Effect {
    buff: Buff;
    constructor(buff: Buff) {
        super();
        this.buff = buff;
    }
}

class AddBuffEffect extends BuffEffect {
    duration: number;
    constructor(buff: Buff, duration: number) {
        super(buff);
        this.duration = duration;
    }
    doApply(handle: GameHandle) {
        for (const activeBuff of handle.activeBuffs) {
            if (activeBuff.buff === this.buff) {
                activeBuff.duration = this.duration;
                return {
                    type: 'buff',
                    detail: `buff ${this.buff.name} refreshed`,
                    value: this.duration,
                };
            }
        }
        handle.activeBuffs.push({
            buff: this.buff,
            duration: this.duration,
            startTime: 0,
        });
        return {
            type: 'buff',
            detail: `buff ${this.buff.name} added`,
            value: this.duration,
        };
    }
}

/* TODO: ComboSuccessEffect 应该有一个父类 SelectEffect */

class ComboSuccessEffect extends Effect {
    skill: Skill;
    combo: Combo;
    successEffect: Effect;
    failEffect?: Effect;
    constructor(
        skill: Skill,
        combo: Combo,
        successEffect: Effect,
        failEffect?: Effect,
    ) {
        super();
        this.skill = skill;
        this.combo = combo;
        this.successEffect = successEffect;
        this.failEffect = failEffect;
    }
    public attach(gameHandle: GameHandle) {
        super.attach(gameHandle);
        this.successEffect.attach(gameHandle);
        if (this.failEffect !== undefined) {
            this.failEffect.attach(gameHandle);
        }
        return this;
    }
    doApply() {
        if (this.combo.checkCombo(this.skill)) {
            return this.successEffect.apply();
        } else {
            if (this.failEffect !== undefined) {
                return this.failEffect.apply();
            }
            return {
                type: 'combo',
                detail: 'combo failed, no fail effect',
                value: 0,
            }
        }
    }
}

export function Damage(rawPotency: number) {
    return new DamageEffect(rawPotency);
}
export function ChangeResource(resource: Resource, delta: number) {
    return new ResourceChangeEffect(resource, delta);
}
export function ClearResource(resource: Resource) {
    return new ResourceClearEffect(resource);
}
export function AddBuff(buff: Buff, duration: number) {
    return new AddBuffEffect(buff, duration);
}
export function ComboSuccess(
    skill: Skill,
    combo: Combo,
    successEffect: Effect,
    failEffect?: Effect,
) {
    return new ComboSuccessEffect(skill, combo, successEffect, failEffect);
}
