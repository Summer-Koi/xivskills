import { GameHandle } from './gameHandle';
import { Combo } from './combo';
import { Skill } from './skill';
import { Resource } from './resource';

export abstract class Effect {
    protected _gameHandle: GameHandle | undefined;
    public attach(gameHandle: GameHandle) {
        this._gameHandle = gameHandle;
    }
    protected checkGameHandle() {
        if (this._gameHandle === undefined) {
            throw new Error('GameHandle not attached');
        }
    }
    abstract apply(): void;
}

class DamageEffect extends Effect {
    rawPotency: number;
    constructor(rawPotency: number) {
        super();
        this.rawPotency = rawPotency;
    }
    apply() {
        this.checkGameHandle();
        this._gameHandle!.dealFinalDamage(this.rawPotency);
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
    apply() {
        this.checkGameHandle();
        this.resource.current += this.delta;
        console.log(`Resource ${this.resource.name} changed by ${this.delta}`);
    }
}

class ResourceClearEffect extends ResourceEffect {
    constructor(resource: Resource) {
        super(resource);
    }
    apply() {
        this.checkGameHandle();
        this.resource.setToMin();
        console.log(`Resource ${this.resource.name} cleared`);
    }
}

class ComboSuccessEffect extends Effect {
    skill: Skill;
    combo: Combo;
    successEffect: Effect;
    failEffect?: Effect;
    constructor(skill: Skill, combo: Combo, successEffect: Effect, failEffect?: Effect) {
        super();
        this.skill = skill;
        this.combo = combo;
        this.successEffect = successEffect;
        this.failEffect = failEffect;
    }
    public attach(gameHandle: GameHandle): void {
        super.attach(gameHandle);
        this.successEffect.attach(gameHandle);
        if (this.failEffect !== undefined) {
            this.failEffect.attach(gameHandle);
        }
    }
    apply() {
        this.checkGameHandle();
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
export function ComboSuccess(skill: Skill, combo: Combo, successEffect: Effect, failEffect?: Effect) {
    return new ComboSuccessEffect(skill, combo, successEffect, failEffect);
}
