/* import { Skill, SkillCategory, ConstantPotency, ComboSuccessPotency } from "./xivsim";
import { Combo } from "./xivsim/combo";
import GameHandle from "./xivsim/gameHandle";

var s1 = new Skill('s1', '', SkillCategory.WeaponSkill, 2.5, 0, false);
var s2 = new Skill('s2', '', SkillCategory.WeaponSkill, 2.5, 0, false);
var s3 = new Skill('s3', '', SkillCategory.WeaponSkill, 2.5, 0, false);

var c = new Combo([s1, s2, s3], [s1, s2, s3]);

s1.rawPotencyF = ConstantPotency(100);
s2.rawPotencyF = ComboSuccessPotency(c, s2, 100, 200)
s3.rawPotencyF = ComboSuccessPotency(c, s3, 100, 400)

s1.cast()
s2.cast()
s3.cast()
s3.cast()

s1.cast()
s2.cast()
s2.cast() */

import { SamuraiJob } from "./data/samurai";
import { bindJobWithGameHandle } from "./data";
import { GameHandle } from "./xivsim/gameHandle";
import samurai from "./data/samurai";

const gameHandle = new GameHandle();
bindJobWithGameHandle(SamuraiJob, gameHandle);

samurai.Hakaze.cast()
samurai.Jinpu.cast()
samurai.Gekko.cast()

samurai.Hakaze.cast()
samurai.Shifu.cast()
samurai.Kasha.cast()

samurai.Hakaze.cast()
samurai.Yukikaze.cast()
