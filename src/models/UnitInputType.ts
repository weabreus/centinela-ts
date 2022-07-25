import ResidentInputDataType from "./ResidentInputDataType";
import VisitorInputDataType from "./VisitorInputDataType";

type UnitInputType = {
    value: string;
    label: string;
    authorizedVisitors: VisitorInputDataType[];
    residents: ResidentInputDataType[];
}

export default UnitInputType;