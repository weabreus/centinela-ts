function ProfileFields(props) {

  const [ selectedFields ] = props;

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
          <dt className="text-sm font-medium text-gray-500">About</dt>
          <dd
            className="mt-1 max-w-prose text-sm text-gray-900 space-y-5"
            
          />
        </div>
      </dl>
    </div>
  );
}

export default ProfileFields;
