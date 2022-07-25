import { Timestamp } from "firebase/firestore";
import { Options } from "react-select";
import UnitInputType from "./UnitInputType";
import * as yup from "yup";

export const schema = yup.object().shape({
  id: yup.string(),
  entryTimestamp: yup.date().default(() => new Date()),
  visitorName: yup.string().required(),
  visitorID: yup.string().required(),
  unit: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          identification: yup.string(),
          label: yup.string(),
          path: yup.string(),
          value: yup.string(),
        })
    ),
  vehicleMake: yup.string().required(),
  vehicleModel: yup.string().required(),
  vehicleColor: yup.string().required(),
  vehiclePlate: yup.string().required(),
  notes: yup.string(),
  visitors: yup.string(),
  complex: yup.string(),
  type: yup.string()
});

interface VisitDataType {
  id?: string;
  entryTimestamp: Timestamp;
  visitorName: string;
  visitorID: string;
  unit: Options<UnitInputType>;
  vehicleMake: string;
  vehicleModel: string;
  vehicleColor: string;
  vehiclePlate: string;
  notes: string;
  visitors: string;
  type:  string;
}

export default VisitDataType;
