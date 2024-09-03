import { Skill } from './skill.ts';

export interface SkillLogEntry {
    skill: Skill;
    time: number;
}

export class SkillLogger {
    skillLogs: SkillLogEntry[] = [];

    log(skill: Skill) {
        this.skillLogs.push({ skill, time: 0 });
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
}
