import { FormGroup } from '@angular/forms';

export function greaterThan(firstControlName: string, secondControlName: string) {
    return (group: FormGroup): { [key: string]: any } => {

        console.log("checking");

        let sH = group.controls[firstControlName].value.hour;
        let sM = group.controls[firstControlName].value.minute;
        let eH = group.controls[secondControlName].value.hour;
        let eM = group.controls[secondControlName].value.minute;

        if (eH < sH || (eH == sH && eM <= sM)) {
            console.log("failed");
            return {
                greaterThan: true
            }
        }

        console.log("sucessed");

        return null;
    }




}