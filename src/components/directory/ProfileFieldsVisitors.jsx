import React from "react";

export default function ProfileFieldsVisitors({ selectedUser, selectedFields }) {
  return (
    <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        {Object.keys(selectedFields).map((field) => (
          <div key={field} className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">{field}</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {selectedFields[field]}
            </dd>
          </div>
        ))}
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500">
            Vehiculos
          </dt>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              {selectedUser?.vehicles?.map((vehicle) => (
                <div key={vehicle?.id} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    {vehicle?.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </dl>
    </div>
  );
}
