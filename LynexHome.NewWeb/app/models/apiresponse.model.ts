import { Deserializable } from "./deserializable.model";

export class ApiResponse extends  Deserializable{
    success: boolean;
    message: string;
    results: any;

}