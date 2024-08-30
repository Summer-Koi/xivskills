import { Buff, DerivedSkill, Skill, SkillCategory } from "../xivsim";
import { Combo } from "../xivsim";
import { Resource, } from "../xivsim";
import { Damage, ComboSuccess, ChangeResource, ClearResource } from "../xivsim/effect";
import { GameHandle } from "../xivsim/gameHandle";

/* basic weapon skills */

const Hakaze = new Skill('刃风', '', SkillCategory.WeaponSkill);

const Jinpu = new Skill('阵风', '', SkillCategory.WeaponSkill);
const Gekko = new Skill('月光', '', SkillCategory.WeaponSkill);

const Shifu = new Skill('士风', '', SkillCategory.WeaponSkill);
const Kasha = new Skill('花车', '', SkillCategory.WeaponSkill);
const Yukikaze = new Skill('雪风', '', SkillCategory.WeaponSkill);

const AllBasicWeaponSkills = [Hakaze, Jinpu, Gekko, Shifu, Kasha, Yukikaze];
const YukiCombo = new Combo([Hakaze, Yukikaze], AllBasicWeaponSkills);
const KashaCombo = new Combo([Hakaze, Shifu, Kasha], AllBasicWeaponSkills);
const GekkoCombo = new Combo([Hakaze, Jinpu, Gekko], AllBasicWeaponSkills);

const Fuka = new Buff('风花', 40)
const Fugetsu = new Buff('风月', 40)

Hakaze.addCastEffect(Damage(200))
Jinpu.addCastEffect(ComboSuccess(Jinpu, GekkoCombo, Damage(280), Damage(120)), /* ActivateBuff(Fugetsu) */)
Gekko.addCastEffect(ComboSuccess(Gekko, GekkoCombo, Damage(380), Damage(170)))
Shifu.addCastEffect(ComboSuccess(Shifu, KashaCombo, Damage(280), Damage(120)), /* ActivateBuff(Fuka) */)
Kasha.addCastEffect(ComboSuccess(Kasha, KashaCombo, Damage(380), Damage(170)))
Yukikaze.addCastEffect(ComboSuccess(Yukikaze, YukiCombo, Damage(300), Damage(120)))

/* Kenki */

const Kenki = new Resource('Kenki', 100, 0)

Hakaze.addCastEffect(ChangeResource(Kenki, 5))
Jinpu.addCastEffect(ComboSuccess(Jinpu, GekkoCombo, ChangeResource(Kenki, 5)))
Gekko.addCastEffect(ComboSuccess(Gekko, GekkoCombo, ChangeResource(Kenki, 10)))
Shifu.addCastEffect(ComboSuccess(Shifu, KashaCombo, ChangeResource(Kenki, 5)))
Kasha.addCastEffect(ComboSuccess(Kasha, KashaCombo, ChangeResource(Kenki, 10)))
Yukikaze.addCastEffect(ComboSuccess(Yukikaze, YukiCombo, ChangeResource(Kenki, 15)))

/* Sen & Iaijutsu */

const Getsu = new Resource('Getsu', 1, 0)
const Ka = new Resource('Ka', 1, 0)
const Setsu = new Resource('Setsu', 1, 0)

Gekko.addCastEffect(ComboSuccess(Gekko, GekkoCombo, ChangeResource(Getsu, 1)))
Kasha.addCastEffect(ComboSuccess(Kasha, KashaCombo, ChangeResource(Ka, 1)))
Yukikaze.addCastEffect(ComboSuccess(Yukikaze, YukiCombo, ChangeResource(Setsu, 1)))

const Iaijutsu = new Skill('Iaijutsu', '', SkillCategory.WeaponSkill, false, 1, 18/25, false)
const Higanbana = new Skill('Higanbana', '', SkillCategory.WeaponSkill, true, 1, 18/25, false)
const MidareSetsugekka = new Skill('MidareSetsugekka', '', SkillCategory.WeaponSkill, true, 1, 18/25, false)

const HiganbanaCondition = (gameHandle: GameHandle) => {
    let num = Getsu.current + Ka.current + Setsu.current
    return num >= 1 - 1e-8
}
const MidareSetsugekkaCondition = (gameHandle: GameHandle) => {
    let num = Getsu.current + Ka.current + Setsu.current
    return num >= 3 - 1e-8
}

const clearSenEffect = [ClearResource(Getsu), ClearResource(Ka), ClearResource(Setsu)]

Higanbana.addCastCondition(HiganbanaCondition)
Higanbana.addCastEffect(...clearSenEffect)
MidareSetsugekka.addCastCondition(MidareSetsugekkaCondition)
MidareSetsugekka.addCastEffect(...clearSenEffect)

const IaijutsuDerivation: DerivedSkill[] = [
    {skill: MidareSetsugekka, priority:2, condition: MidareSetsugekkaCondition},
    {skill: Higanbana, priority:1, condition: HiganbanaCondition},
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