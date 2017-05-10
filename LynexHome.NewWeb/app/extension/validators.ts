import { FormGroup } from '@angular/forms';

export function greaterThan() {
    return (group: FormGroup): { [key: string]: any } => {

        console.log("checking");

        let sH = group.get("sTime").value.hour;
        let sM = group.get("sTime").value.minute;
        let eH = group.get("eTime").value.hour;
        let eM = group.get("eTime").value.minute;

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