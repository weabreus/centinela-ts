import { Options } from "react-select";
import InputType from "./InputType";
import ResidentInputDataType from "./ResidentInputDataType";
import VisitorInputDataType from "./VisitorInputDataType";

interface UnitDataType {
    id?: string;
    number: string;
    building: Options<InputType>,
    residents: Options<ResidentInputDataType>,
    vehicles: Options<InputType>,
    authorizedVisitors: Options<VisitorInputDataType>,
    pets?: Options<InputType>,
    path?: string
  }

export default UnitDataType;