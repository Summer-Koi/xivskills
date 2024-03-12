import { AddResource, ClearResource, DerivedSkill, PrintMessage, Skill, SkillCategory } from "../xivsim";
import { Combo } from "../xivsim";
import { Resource } from "../xivsim";
import { SkillAttack} from "../xivsim";
import { IfComboSuccess, IfResourceEnough } from "../xivsim/logicOperator";

/* basic weapon skills */

const Hakaze = new Skill('刃风', 
                        '', 
                        SkillCategory.WeaponSkill, 
                        1, 0, false);

const Jinpu = new Skill('阵风', 
                        '', 
                        SkillCategory.WeaponSkill, 
                        1, 0, false);

const Gekko = new Skill('月光',
                        '',
                        SkillCategory.WeaponSkill,
                        1, 0, false);

const Shifu = new Skill('士风',
                        '',
                        SkillCategory.WeaponSkill,
                        1, 0, false);

const Kasha = new Skill('花车',
                        '',
                        SkillCategory.WeaponSkill,
                        1, 0, false);

const Yukikaze = new Skill('雪风',
                        '',
                        SkillCategory.WeaponSkill,
                        1, 0, false);

const AllBasicWeaponSkills = [Hakaze, Jinpu, Gekko, Shifu, Kasha, Yukikaze];
const YukiCombo = new Combo([Hakaze, Yukikaze], AllBasicWeaponSkills);
const KashaCombo = new Combo([Hakaze, Shifu, Kasha], AllBasicWeaponSkills);
const GekkoCombo = new Combo([Hakaze, Jinpu, Gekko], AllBasicWeaponSkills);

Hakaze.addCastEffect(SkillAttack(200))
Jinpu.addCastEffect(IfComboSuccess(GekkoCombo, SkillAttack(280), SkillAttack(120)))
Gekko.addCastEffect(IfComboSuccess(GekkoCombo, SkillAttack(380), SkillAttack(170)))
Shifu.addCastEffect(IfComboSuccess(KashaCombo, SkillAttack(280), SkillAttack(120)))
Kasha.addCastEffect(IfComboSuccess(KashaCombo, SkillAttack(380), SkillAttack(170)))
Yukikaze.addCastEffect(IfComboSuccess(YukiCombo, SkillAttack(300), SkillAttack(120)))

const Kenki = new Resource('Kenki', 100, 0)

Hakaze.addCastEffect(AddResource(Kenki, 5))
Jinpu.addCastEffect(IfComboSuccess(GekkoCombo, AddResource(Kenki, 5)))
Gekko.addCastEffect(IfComboSuccess(GekkoCombo, AddResource(Kenki, 10)))
Shifu.addCastEffect(IfComboSuccess(KashaCombo, AddResource(Kenki, 5)))
Kasha.addCastEffect(IfComboSuccess(KashaCombo, AddResource(Kenki, 10)))
Yukikaze.addCastEffect(IfComboSuccess(YukiCombo, AddResource(Kenki, 15)))

const Getsu = new Resource('Getsu', 1, 0)
const Ka = new Resource('Ka', 1, 0)
const Setsu = new Resource('Setsu', 1, 0)

Gekko.addCastEffect(IfComboSuccess(GekkoCombo, AddResource(Getsu, 1)))
Kasha.addCastEffect(IfComboSuccess(KashaCombo, AddResource(Ka, 1)))
Yukikaze.addCastEffect(IfComboSuccess(YukiCombo, AddResource(Setsu, 1)))

const Iaijutsu = new Skill('Iaijutsu', '', SkillCategory.WeaponSkill, 1, 18.0/25.0, false)
const Higanbana = new Skill('Higanbana', '', SkillCategory.WeaponSkill, 1, 18.0/25.0, false)
const MidareSetsugekka = new Skill('MidareSetsugekka', '', SkillCategory.WeaponSkill, 1, 18.0/25.0, false)

const HiganbanaCondition = (skill: Skill) => {
    let num = Getsu.current + Ka.current + Setsu.current
    return num >= 1 - 1e-8
}
const MidareSetsugekkaCondition = (skill: Skill) => {
    let num = Getsu.current + Ka.current + Setsu.current
    return num >= 3 - 1e-8
}

const clearSen = [ClearResource(Getsu), ClearResource(Ka), ClearResource(Setsu)]

Higanbana.addCastCondition(HiganbanaCondition)
Higanbana.addCastEffect(PrintMessage('Higanbana!'), ...clearSen)
MidareSetsugekka.addCastCondition(MidareSetsugekkaCondition)
MidareSetsugekka.addCastEffect(PrintMessage('MidareSetsugekka!'), ...clearSen)

const IaijutsuDerivation: DerivedSkill[] = [
    {skill: MidareSetsugekka, condition: MidareSetsugekkaCondition},
    {skill: Higanbana, condition: HiganbanaCondition},
]

Iaijutsu.addDerivedSkill(...IaijutsuDerivation)
Iaijutsu.addCastCondition(() => false)

export const SamuraiJob = {
    name: 'Samurai',
    combos: { YukiCombo, KashaCombo, GekkoCombo },
    skills: { Hakaze, Jinpu, Gekko, Shifu, Kasha, Yukikaze, Iaijutsu, Higanbana, MidareSetsugekka },
    buffs: {},
    resources: { Kenki, Getsu, Ka, Setsu }
}

export default { Hakaze, Jinpu, Gekko, Shifu, Kasha, Yukikaze, Iaijutsu };