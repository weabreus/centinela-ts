import Select from "react-select/dist/declarations/src/Select";
import InputType from "./InputType";

interface BuildingsShortType {
  id?: string | undefined;
  name: string;
  address: string;
  complex: Select<InputType[]>;
}

export default BuildingsShortType;
