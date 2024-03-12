import { Skill, CastEffect, CastCondition } from "./skill";
import { Resource } from "./resource";
import { Combo } from "./combo";

export function IfResourceEnough(resource: Resource, thredshold: number): CastCondition;
export function IfResourceEnough(resource: Resource, thredshold: number, success: CastEffect, fail?: CastEffect): CastEffect;
export function IfResourceEnough(resource: Resource, thredshold: number, success?: CastEffect, fail?: CastEffect)
{
    if (success == undefined && fail == undefined) {
        return (s: Skill) => {
            if (resource.current >= thredshold)
                return true;
            return false
        }
    }
    else if (success != undefined) {
        return (s: Skill) => {
            if (resource.current >= thredshold) {
                success(s);
            }
            else {
                if (fail != undefined) {
                    fail(s);
                }
            }
        }
    }

}

export function IfComboSuccess(combo: Combo, success: CastEffect, fail?: CastEffect): CastEffect {
    return (s: Skill) => {
        if (combo.checkCombo(s)) {
            return success(s);
        }
        else {
            if (fail != undefined) {
                return fail(s);
            }
        }
    }
}