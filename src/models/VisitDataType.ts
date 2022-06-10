import { Timestamp } from "firebase/firestore";
import { Options } from "react-select";
import Input from "./Input";
import InputType from "./InputType";

interface VisitDataType {
    id?: string;
    visitor: Input[];
    vehicle: Input[];
    unit: Options<InputType[]>;
    visitors: string;
    entryTimestamp: Timestamp;
    exitTimestamp: Timestamp | undefined;
    notes: string;
}

export default VisitDataType;