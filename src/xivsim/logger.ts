import { Skill } from './skill.ts';
import { EffectLog } from './effect.ts';

export interface SkillLogEntry {
    skill: Skill;
    time: number;
    effectLogs: EffectLog[];
}

export class SkillLogger {
    skillLogs: SkillLogEntry[] = [];

    log(skill: Skill, effectLogs: EffectLog[]) {
        this.skillLogs.push({ skill, time: 0, effectLogs });
    }
    clear() {
        this.skillLogs = [];
    }
    getLast() {
        if (this.skillLogs.length === 0) {
            return null;
        }
        return this.skillLogs[this.skillLogs.length - 1];
    }
    getLastDamage() {
        const last = this.getLast();
        if (last === null) {
            return null;
        }
        let damageLog = last.effectLogs.filter((log) => log.type === 'damage');
        if (damageLog.length > 0)
            return damageLog[0].value;
        return null;
    }
}
