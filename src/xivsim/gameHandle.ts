import { Resource } from './resource';
import { Buff } from './buff';
import { Skill } from './skill';
import { Combo } from './combo';
import { Job } from './job';

export class GameHandle {
    resources: Resource[] = [];
    buffs: { [key: string]: Buff } = {};
    combos: Combo[] = [];
    
    GCD: number = 2500; // ms

    cast(skill: Skill, derivingCast: boolean = false) {

        /* handle derived skills */
        if (skill.derived && !derivingCast) {
            throw new Error('Cannot cast a derived skill directly.');
        }
        skill._derivedSkills.sort((a, b) => b.priority - a.priority);
        for (let derived of skill._derivedSkills) {
            if (derived.condition(this)) {
                console.log('Skill derived! ' + derived.skill.name + ' is casted.')
                this.cast(derived.skill, derivingCast = true);
                return;
            }
        }

        /* handle cast conditions */
        for (let condition of skill._castConditionList) {
            if (!condition(this)) {
                console.log('Cast condition not met');
                return;
            }
        }

        /* handle cast events */
        for (let effect of skill._castEffectList) {
            effect.apply();
        }

        /* handle combo states */
        this.combos.forEach(combo => {
            let check = combo.checkCombo(skill);
            combo.nextCombo(check);
        });
    }

    bind(job: Job) {
        Object.values(job.skills).forEach(skill => {
            skill.attach(this);
        });
        this.combos = Object.values(job.combos);
        this.buffs = job.buffs;
    }

    lastDamage: number = 0;
    dealFinalDamage(damage: number) {
        this.lastDamage = damage;
    }
    getLastDamage() {
        return this.lastDamage;
    }
}