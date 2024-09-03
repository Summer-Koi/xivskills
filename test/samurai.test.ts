import { expect } from 'chai';
import { SamuraiJob } from '../src/data/samurai.ts';
import { GameHandle } from '../src/xivsim/gameHandle.ts';
import smr from '../src/data/samurai.ts';

const gh = new GameHandle();
gh.bind(SamuraiJob);

describe('SMR Basic Combo Damage Test', () => {
    it('Yuuki Combo', () => {
        gh.cast(smr.Hakaze);
        expect(gh.lastDamage).equal(200);
        gh.cast(smr.Yukikaze);
        expect(gh.lastDamage).equal(300);
        gh.cast(smr.Yukikaze);
        expect(gh.lastDamage).equal(120);
    });
    it('Kasha Combo', () => {
        gh.cast(smr.Hakaze);
        expect(gh.lastDamage).equal(200);
        gh.cast(smr.Shifu);
        expect(gh.lastDamage).equal(280);
        gh.cast(smr.Kasha);
        expect(gh.lastDamage).equal(380);
        gh.cast(smr.Kasha);
        expect(gh.lastDamage).equal(170);
        gh.cast(smr.Shifu);
        expect(gh.lastDamage).equal(120);
    });
    it('Gekko Combo', () => {
        gh.cast(smr.Hakaze);
        expect(gh.lastDamage).equal(200);
        gh.cast(smr.Jinpu);
        expect(gh.lastDamage).equal(280);
        gh.cast(smr.Gekko);
        expect(gh.lastDamage).equal(380);
        gh.cast(smr.Gekko);
        expect(gh.lastDamage).equal(170);
        gh.cast(smr.Jinpu);
        expect(gh.lastDamage).equal(120);
    });
    it('Mixed Combo', () => {
        gh.cast(smr.Hakaze);
        expect(gh.lastDamage).equal(200);
        gh.cast(smr.Gekko);
        expect(gh.lastDamage).equal(170);
        gh.cast(smr.Kasha);
        expect(gh.lastDamage).equal(170);
        gh.cast(smr.Hakaze);
        expect(gh.lastDamage).equal(200);
        gh.cast(smr.Jinpu);
        expect(gh.lastDamage).equal(280);
        gh.cast(smr.Kasha);
        expect(gh.lastDamage).equal(170);
    });
});

describe('SMR Double Buff Test', () => {
    it('Jinpu-Fugetsu', () => {
        gh.resetCombos();
        gh.resetBuffs();
        gh.cast(smr.Hakaze);
        gh.cast(smr.Jinpu);
        const targetBuff = gh.activeBuffs.find(
            (item) => item.buff.name === '风月',
        );
        expect(targetBuff).to.exist;
    });
    it('Shifu-Fuka', () => {
        gh.resetCombos();
        gh.resetBuffs();
        gh.cast(smr.Hakaze);
        gh.cast(smr.Shifu);
        const targetBuff = gh.activeBuffs.find(
            (item) => item.buff.name === '风花',
        );
        expect(targetBuff).to.not.be.undefined;
    });
});

describe('SMR Kenki Test', () => {
    it('Kenki Get', () => {
        gh.resetCombos();
        gh.resetBuffs();
        gh.resetResources();
        gh.cast(smr.Hakaze);
        expect(gh.resources.Kenki.current).equal(5);
        gh.cast(smr.Jinpu);
        expect(gh.resources.Kenki.current).equal(10);
        gh.cast(smr.Gekko);
        expect(gh.resources.Kenki.current).equal(20);
        gh.cast(smr.Hakaze);
        expect(gh.resources.Kenki.current).equal(25);
        gh.cast(smr.Yukikaze);
        expect(gh.resources.Kenki.current).equal(40);
    });
});

describe('SMR Iaijutsu Test', () => {
    it('Higanbana', () => {
        gh.reset();
        gh.cast(smr.Hakaze);
        gh.cast(smr.Jinpu);
        gh.cast(smr.Gekko);
        gh.cast(smr.Iaijutsu);
        expect(gh.skillLogger.getLast()?.skill.name).equal('彼岸花');
        gh.skillLogger.clear();

        gh.cast(smr.Hakaze);
        gh.cast(smr.Yukikaze);
        gh.cast(smr.Iaijutsu);
        expect(gh.skillLogger.getLast()?.skill.name).equal('彼岸花');
        gh.skillLogger.clear();

        gh.cast(smr.Hakaze);
        gh.cast(smr.Shifu);
        gh.cast(smr.Kasha);
        gh.cast(smr.Iaijutsu);
        expect(gh.skillLogger.getLast()?.skill.name).equal('彼岸花');
        gh.skillLogger.clear();

        gh.cast(smr.Hakaze);
        gh.cast(smr.Jinpu);
        gh.cast(smr.Iaijutsu);
        expect(gh.skillLogger.getLast()?.skill).to.equal(smr.Jinpu);
    });
    it('MidareSetsugekka', () => {
        gh.reset();
        gh.cast(smr.Hakaze);
        gh.cast(smr.Jinpu);
        gh.cast(smr.Gekko);

        gh.cast(smr.Hakaze);
        gh.cast(smr.Yukikaze);

        gh.cast(smr.Hakaze);
        gh.cast(smr.Shifu);
        gh.cast(smr.Kasha);

        gh.cast(smr.Iaijutsu);
        expect(gh.skillLogger.getLast()?.skill.name).equal('纷乱雪月花');
    });
});
