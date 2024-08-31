import { Skill } from './skill.ts';

export class Combo {
    comboSkills: Skill[];
    interruptionSkills: Skill[];
    constructor(comboSkills: Skill[], interruptionSkills: Skill[]) {
        this.comboSkills = comboSkills;
        this.interruptionSkills = interruptionSkills;
    }

    currentComboStep: number = 0;

    getNextComboSkill() {
        if (this.currentComboStep == 0) {
            return null;
        }
        return this.comboSkills[this.currentComboStep];
    }

    checkCombo(skill: Skill) {
        if (this.interruptionSkills.includes(skill)) {
            if (this.comboSkills[this.currentComboStep] == skill) {
                return true;
            }
        }
        return false;
    }

    nextCombo(comboSuccess: boolean) {
        if (comboSuccess) {
            this.currentComboStep++;
            if (this.currentComboStep >= this.comboSkills.length) {
                this.currentComboStep = 0;
            }
        } else {
            this.currentComboStep = 0;
        }
    }
}
