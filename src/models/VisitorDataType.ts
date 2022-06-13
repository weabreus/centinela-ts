import { Options } from "react-select";
import InputType from "./InputType";

interface VisitorDataType {
  id?: string;
  photo?: string;
  identification: string;
  name: string;
  vehicles?: Options<InputType[]>;
}

export default VisitorDataType;
