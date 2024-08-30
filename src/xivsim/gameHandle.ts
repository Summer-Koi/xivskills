import { Resource } from './resource';
import { Buff } from './buff';
import { Skill } from './skill';
import { Combo } from './combo';

export class GameHandle {
    resources: Resource[] = [];
    buffs: { [key: string]: Buff } = {};
    combos: Combo[] = [];
    
    GCD: number = 2500;

    comboNextStep(skill: Skill) {
        this.combos.forEach(combo => {
            let check = combo.checkCombo(skill);
            combo.nextCombo(check);
        });
    }
}

/* side effects */

export function SkillAttack(rawpotency: number) {
    return (s: Skill) => {
        console.log(rawpotency);
    }
}

export function AddResource(resource: Resource, amount: number) {
    return (s: Skill) => {
        resource.add(amount);
        console.log('Current ' + resource.name + ': ' + resource.current);
    }
}

export function ClearResource(resource: Resource) {
    return (s: Skill) => {
        resource.clear();
    }
}

export function SubResource(resource: Resource, amount: number) {
    return (s: Skill) => {
        resource.sub(amount);
    }
}

export function PrintMessage(message: string) {
    return (s: Skill) => {
        console.log(message);
    }
}

export function ActivateBuff(buff: Buff) {
    return (s: Skill) => {
        buff.activate();
        var ghdl = s.gameHandle
        
    }
}