import { Options } from "react-select";
import InputType from "./InputType";

interface UnitDataType {
    number: string;
    building: Options<InputType[]>,
    residents?: Options<InputType[]>,
    vehicles?: Options<InputType[]>,
    authorizedVisitors?: Options<InputType[]>,
    pets?: Options<InputType[]>,
  }

export default UnitDataType;