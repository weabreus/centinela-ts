import { Timestamp } from "firebase/firestore";
import { Options } from "react-select";
import UnitInputType from "./UnitInputType";

interface VisitDataType {
  id?: string;
  entryTimestamp: Timestamp;
  visitorName: string;
  visitorID: string;
  unit: Options<UnitInputType>;
  vehicleModel: string;
  vehiclePlate: string;
  notes: string;
  visitors: string;
}

export default VisitDataType;
