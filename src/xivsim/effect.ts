import { GameHandle } from './gameHandle.ts';
import { Combo } from './combo.ts';
import { Skill } from './skill.ts';
import { Resource } from './resource.ts';
import { Buff } from './buff.ts';

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
        this.doApply(this._gameHandle);
    }
    protected abstract doApply(handle: GameHandle): void;
    apply(): void {
        this.applyWithPreChecks();
    }
}

class DamageEffect extends Effect {
    rawPotency: number;
    constructor(rawPotency: number) {
        super();
        this.rawPotency = rawPotency;
    }
    doApply(handle: GameHandle) {
        handle.dealFinalDamage(this.rawPotency);
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
        this.resource.current += this.delta;
    }
}

class ResourceClearEffect extends ResourceEffect {
    doApply() {
        this.resource.setToMin();
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
                return;
            }
        }
        handle.activeBuffs.push({
            buff: this.buff,
            duration: this.duration,
            startTime: 0,
        });
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
            this.successEffect.apply();
        } else {
            if (this.failEffect !== undefined) {
                this.failEffect.apply();
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
