import { Timestamp } from "firebase/firestore";
import { Options } from "react-select";
import Input from "./Input";
import InputType from "./InputType";

class Visit {
  id?: string;
  visitor: Input[];
  vehicle: Input[];
  unit: Options<InputType>;
  visitors: string;
  entryTimestamp: Timestamp;
  exitTimestamp?: Timestamp | undefined;
  notes: string;

  constructor(
    idText: string,
    visitorInput: Input[],
    vehicleInput: Input[],
    unitInput: Options<InputType>,
    visitorsText: string,
    entryTimestamp: Timestamp,
    exitTimestamp: Timestamp | undefined,
    notes: string
  ) {
    this.id = idText;
    this.visitor = visitorInput;
    this.vehicle = vehicleInput;
    this.unit = unitInput;
    this.visitors = visitorsText;
    this.entryTimestamp = entryTimestamp;
    this.exitTimestamp = exitTimestamp;
    this.notes = notes;
  }
}

export default Visit;
