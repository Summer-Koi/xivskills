import { Resource } from './resource.ts';
import { Buff, ActiveBuff } from './buff.ts';
import { Skill } from './skill.ts';
import { Combo } from './combo.ts';
import { Job } from './job.ts';
import { SkillLogger } from './logger.ts';

export class GameHandle {
    resources: { [key: string]: Resource } = {};
    buffs: { [key: string]: Buff } = {};
    activeBuffs: ActiveBuff[] = [];
    combos: Combo[] = [];

    GCD: number = 2500; // ms

    skillLogger: SkillLogger = new SkillLogger();

    cast(skill: Skill, derivingCast: boolean = false) {
        /* handle derived skills */
        if (skill.derived && !derivingCast) {
            throw new Error('Cannot cast a derived skill directly.');
        }
        skill._derivedSkills.sort((a, b) => b.priority - a.priority);
        for (const derived of skill._derivedSkills) {
            if (derived.condition(this)) {
                this.cast(derived.skill, (derivingCast = true));
                return;
            }
        }

        /* handle cast conditions */
        for (const condition of skill._castConditionList) {
            if (!condition(this)) {
                console.log('Cast condition not met');
                return;
            }
        }

        /* handle cast events */
        for (const effect of skill._castEffectList) {
            effect.apply();
        }

        /* update combo status */
        this.combos.forEach((combo) => {
            const check = combo.checkCombo(skill);
            combo.nextCombo(check);
        });

        /* skill logging */
        this.skillLogger.log(skill);
    }

    bind(job: Job) {
        Object.values(job.skills).forEach((skill) => {
            skill.attach(this);
        });
        this.combos = Object.values(job.combos);
        this.buffs = job.buffs;
        this.resources = job.resources;
    }

    lastDamage: number = 0;
    dealFinalDamage(damage: number) {
        this.lastDamage = damage;
    }

    resetCombos() {
        this.combos.forEach((combo) => {
            combo.reset();
        });
    }
    resetResources() {
        Object.values(this.resources).forEach((resource) => {
            resource.setToMin();
        });
    }
    resetBuffs() {
        this.activeBuffs = [];
    }
    reset() {
        this.resetCombos();
        this.resetResources();
        this.resetBuffs();
        this.skillLogger.clear();
    }

    getLastDamage() {
        return this.lastDamage;
    }
}
