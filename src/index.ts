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

samurai.Iaijutsu.cast()

samurai.Hakaze.cast()
samurai.Yukikaze.cast()

samurai.Iaijutsu.cast()
samurai.Iaijutsu.cast()