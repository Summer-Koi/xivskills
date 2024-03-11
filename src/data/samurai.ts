import { Skill, SkillCategory } from "../xivsim";
import { Combo } from "../xivsim";
import { Resource } from "../xivsim";
import { ConstantPotency, ComboSuccessPotency } from "../xivsim";

import { Job } from ".";

/* basic weapon skills */

const Hakaze = new Skill('刃风', 
                        '', 
                        SkillCategory.WeaponSkill, 
                        2.5, 0, false);

const Jinpu = new Skill('阵风', 
                        '', 
                        SkillCategory.WeaponSkill, 
                        2.5, 0, false);

const Gekko = new Skill('月光',
                        '',
                        SkillCategory.WeaponSkill,
                        2.5, 0, false);

const Shifu = new Skill('士风',
                        '',
                        SkillCategory.WeaponSkill,
                        2.5, 0, false);

const Kasha = new Skill('花车',
                        '',
                        SkillCategory.WeaponSkill,
                        2.5, 0, false);

const Yukikaze = new Skill('雪风',
                        '',
                        SkillCategory.WeaponSkill,
                        2.5, 0, false);

const AllBasicWeaponSkills = [Hakaze, Jinpu, Gekko, Shifu, Kasha, Yukikaze];
const YukiCombo = new Combo([Hakaze, Yukikaze], AllBasicWeaponSkills);
const KashaCombo = new Combo([Hakaze, Shifu, Kasha], AllBasicWeaponSkills);
const GekkoCombo = new Combo([Hakaze, Jinpu, Gekko], AllBasicWeaponSkills);

Hakaze.rawPotencyF = ConstantPotency(200);
Jinpu.rawPotencyF = ComboSuccessPotency(GekkoCombo, Jinpu, 120, 280);
Gekko.rawPotencyF = ComboSuccessPotency(GekkoCombo, Gekko, 170, 380);
Shifu.rawPotencyF = ComboSuccessPotency(KashaCombo, Shifu, 120, 280);
Kasha.rawPotencyF = ComboSuccessPotency(KashaCombo, Kasha, 170, 380);
Yukikaze.rawPotencyF = ComboSuccessPotency(YukiCombo, Yukikaze, 120, 300);

export const SamuraiJob: Job = {
    name: 'Samurai',
    combos: [YukiCombo, KashaCombo, GekkoCombo],
    skills: [Hakaze, Jinpu, Gekko, Shifu, Kasha, Yukikaze],
    buffs: [],
    resources: []
}

export default { Hakaze, Jinpu, Gekko, Shifu, Kasha, Yukikaze };