import Directory from "../../models/DirectoryType";
import VisitorDataType from "../../models/VisitorDataType";

const AuthVisitorsListResults: React.FC<{
  authorizedVisitors: Directory<VisitorDataType>;
  visitorName: React.RefObject<HTMLInputElement>;
  visitorID: React.RefObject<HTMLInputElement>;
}> = ({authorizedVisitors, visitorName, visitorID}) => {
  return (
    <nav className="h-full overflow-y-auto" aria-label="Directory">
      {Object.keys(authorizedVisitors).sort().map((letter) => (
        <div key={JSON.stringify(letter)} className="relative">
          <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
            <h3>{letter}</h3>
          </div>
          <ul className="relative z-0 divide-y divide-gray-200">
            {authorizedVisitors[letter].map((person: VisitorDataType) => (
              <li key={JSON.stringify(person.id)} className="bg-white">
                <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt=""
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span onClick={() => {
                        visitorName.current!.value = person.name;
                        visitorID.current!.value = person.identification;
                    }} className="focus:outline-none">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">
                        {person.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {person.identification}
                      </p>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default AuthVisitorsListResults;