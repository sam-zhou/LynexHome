export interface IDeserializable {
    deserialize(input: Object): IDeserializable;
}

export class Deserializable  {

    deserialize(input: Object): Deserializable {

        let instance = this;
        for (var prop in input) {
            if (!input.hasOwnProperty(prop)) {
                continue;
            }
            else {

                if (typeof input[prop] === 'object') {
                    instance[prop] = instance[prop].deserialize(input[prop]);
                } else {
                    instance[prop] = input[prop];
                }
            }
        }
        return instance;
    }
}