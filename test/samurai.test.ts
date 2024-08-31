import { expect } from 'earl';
import { SamuraiJob } from '../src/data/samurai.ts';
import { GameHandle } from '../src/xivsim/gameHandle.ts';
import smr from '../src/data/samurai.ts';

const gh = new GameHandle();
gh.bind(SamuraiJob);

describe('Test Samurai Basic Combo Damage', () => {
    it('Yuuki Combo', () => {
        gh.cast(smr.Hakaze);
        expect(gh.lastDamage).toEqual(200);
        gh.cast(smr.Yukikaze);
        expect(gh.lastDamage).toEqual(300);
        gh.cast(smr.Yukikaze);
        expect(gh.lastDamage).toEqual(120);
    });
    it('Kasha Combo', () => {
        gh.cast(smr.Hakaze);
        expect(gh.lastDamage).toEqual(200);
        gh.cast(smr.Shifu);
        expect(gh.lastDamage).toEqual(280);
        gh.cast(smr.Kasha);
        expect(gh.lastDamage).toEqual(380);
        gh.cast(smr.Kasha);
        expect(gh.lastDamage).toEqual(170);
        gh.cast(smr.Shifu);
        expect(gh.lastDamage).toEqual(120);
    });
    it('Gekko Combo', () => {
        gh.cast(smr.Hakaze);
        expect(gh.lastDamage).toEqual(200);
        gh.cast(smr.Jinpu);
        expect(gh.lastDamage).toEqual(280);
        gh.cast(smr.Gekko);
        expect(gh.lastDamage).toEqual(380);
        gh.cast(smr.Gekko);
        expect(gh.lastDamage).toEqual(170);
        gh.cast(smr.Jinpu);
        expect(gh.lastDamage).toEqual(120);
    });
    it('Mixed Combo', () => {
        gh.cast(smr.Hakaze);
        expect(gh.lastDamage).toEqual(200);
        gh.cast(smr.Gekko);
        expect(gh.lastDamage).toEqual(170);
        gh.cast(smr.Kasha);
        expect(gh.lastDamage).toEqual(170);
        gh.cast(smr.Hakaze);
        expect(gh.lastDamage).toEqual(200);
        gh.cast(smr.Jinpu);
        expect(gh.lastDamage).toEqual(280);
        gh.cast(smr.Kasha);
        expect(gh.lastDamage).toEqual(170);
    });
});
