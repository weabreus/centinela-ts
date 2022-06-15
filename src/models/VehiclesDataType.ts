import { Options } from "react-select";
import InputType from "./InputType";

interface VehiclesDataType {
  id?: string;
  color: string;
  make: string;
  model: string;
  plate: string;
  year: string;
  visitor?: Options<InputType[]>;
  unit?: Options<InputType[]>;
}

export default VehiclesDataType;
