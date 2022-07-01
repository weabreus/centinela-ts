import { Timestamp } from "firebase/firestore";
import { Options } from "react-select";
import UnitDataType from "./UnitDataType";

interface VisitDataType {
  id?: string;
  entryTimestamp: Timestamp;
  visitorName: string;
  visitorID: string;
  unit: Options<UnitDataType[]>;
  vehicleModel: string;
  vehiclePlate: string;
  notes: string;
  visitors: string;
}

export default VisitDataType;
