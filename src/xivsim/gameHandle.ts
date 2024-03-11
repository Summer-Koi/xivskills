import { Resource } from './resource';
import { Buff } from './buff';
import { Skill } from './skill';
import { Combo } from './combo';

export class GameHandle {
    resources: Resource[] = [];
    buffs: Buff[] = [];
    combos: Combo[] = [];
    

    comboNextStep(skill: Skill) {
        this.combos.forEach(combo => {
            let check = combo.checkCombo(skill);
            combo.nextCombo(check);
        });
    }
    
}