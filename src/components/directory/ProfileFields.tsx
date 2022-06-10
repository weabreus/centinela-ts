import ResidentDataType from "../../models/ResidentDataType";

const ProfileFields: React.FC<{
  selectedUser: ResidentDataType | null;
  selectedFields: {
    "Email": string;
    "Casa": string;
    "Mobil": string;
    "Trabajo": string;
  } | null;
}> = ({ selectedUser, selectedFields }) => {
  return (
    <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
     
          <div key={"residentemail"} className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {selectedFields?.Email}
            </dd>
          </div>

          <div key={"residenthome"} className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Casa</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {selectedFields?.Casa}
            </dd>
          </div>

          <div key={"residentmobile"} className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Mobil</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {selectedFields?.Mobil}
            </dd>
          </div>

          <div key={"residentwork"} className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Trabajo</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {selectedFields?.Trabajo}
            </dd>
          </div>

        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500">
            Contactos de emergencia
          </dt>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              {selectedUser?.contact?.emergency?.map((contact) => (
                <div
                  key={contact?.name}
                  className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt className="text-sm font-medium text-gray-500">
                    {contact?.name}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {contact?.phone}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </dl>
    </div>
  );
};

export default ProfileFields;
