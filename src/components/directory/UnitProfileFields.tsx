import { IdentificationIcon, MailIcon, PhoneIcon, TagIcon, TruckIcon, UserIcon } from "@heroicons/react/outline";
import { classNames } from "../../helpers";
import UnitDataType from "../../models/UnitDataType";

const UnitProfileFields: React.FC<{
  selectedUnit: UnitDataType,
  activeTab: string
}> = ({ selectedUnit, activeTab }) => {

  return (
    <div className="overflow-y-scroll max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Residents information */}
      <dl className={classNames(activeTab !== "Residentes" ? "hidden" : "", "border-b border-gray-200 divide-y divide-gray-200")}>
        {selectedUnit?.residents && (selectedUnit?.residents.map((resident) => (
          <div
            key={resident.value}
            className="py-3 flex justify-between text-sm font-medium"
          >
            <dt className="text-gray-500 flex inline-flex"><UserIcon className="h-6 w-6 pr-2"/>{resident.label}</dt>
            <dd className="text-gray-900 flex inline-flex"><MailIcon className="h-6 w-6 pr-2"/>{resident.email}</dd>
            <dd className="text-gray-900 flex inline-flex"><PhoneIcon className="h-6 w-6 pr-2"/>{resident.mobile}</dd>
          </div>
        )))}
      </dl>

      {/* Vehicles information */}
      <dl className={classNames(activeTab !== "Vehiculos" ? "hidden" : "", "border-b border-gray-200 divide-y divide-gray-200")}>
        {selectedUnit?.vehicles && (selectedUnit?.vehicles.map((vehicle) => (
          <div
            key={vehicle.value}
            className="py-3 flex justify-between text-sm font-medium"
          >
            <dt className="text-gray-500 flex inline-flex"><TruckIcon className="h-6 w-6 pr-2"/>{vehicle.label}</dt>

          </div>
        )))}
      </dl>

      {/* Authorized Visitors information */}
      <dl className={classNames(activeTab !== "Visitantes Autorizados" ? "hidden" : "", "border-b border-gray-200 divide-y divide-gray-200")}>
        {selectedUnit?.authorizedVisitors && (selectedUnit?.authorizedVisitors.map((visitor) => (
          <div
            key={visitor.value}
            className="py-3 flex justify-between text-sm font-medium"
          >
            <dt className="text-gray-500 flex inline-flex w-1/3"><UserIcon className="h-6 w-6 pr-2"/>{visitor.label}</dt>
            <dd className="text-gray-900 flex inline-flex w-1/3 justify-center"><IdentificationIcon className="h-6 w-6 pr-2"/>{visitor.identification}</dd>
            <dd className="text-gray-900 flex inline-flex w-1/3 justify-end"><TagIcon className="h-6 w-6 pr-2"/>{visitor.type}</dd>
          </div>
        )))}
      </dl>

      {/* Pets information */}
      <dl className={classNames(activeTab !== "Mascotas" ? "hidden" : "", "border-b border-gray-200 divide-y divide-gray-200")}>
        {selectedUnit?.pets && (selectedUnit?.pets.map((pet) => (
          <div
            key={pet.value}
            className="py-3 flex justify-between text-sm font-medium"
          >
            <dt className="text-gray-500 flex inline-flex w-1/3"><UserIcon className="h-6 w-6 pr-2"/>{pet.label}</dt>
          </div>
        )))}
      </dl>
    </div>
  );
};

export default UnitProfileFields;
