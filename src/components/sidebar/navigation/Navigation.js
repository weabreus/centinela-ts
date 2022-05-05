import {
  ClockIcon,
  HomeIcon,
  ViewListIcon,
} from "@heroicons/react/outline";

const navigation = [
  { name: "Visitas", href: "#", icon: HomeIcon, current: true },
  { name: "Residentes", href: "#", icon: ViewListIcon, current: false },
  { name: "Placeholder", href: "#", icon: ClockIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navigation() {
  return (
    <nav className="px-3 mt-6">
      <div className="space-y-1">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current
                ? "bg-gray-200 text-gray-900"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
              "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            <item.icon
              className={classNames(
                item.current
                  ? "text-gray-500"
                  : "text-gray-400 group-hover:text-gray-500",
                "mr-3 flex-shrink-0 h-6 w-6"
              )}
              aria-hidden="true"
            />
            {item.name}
          </a>
        ))}
      </div>
      
    </nav>
  );
}

export default Navigation;
