export default function NavbarDateRange({ filterVisitsHandler, inputRef, label }) {
  
  return (
    <div className="sm:ml-6 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600">
      <label
        htmlFor="name"
        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        onChange={filterVisitsHandler}
        ref={inputRef}
        pattern="[0-9]{4}[0-9]{2}[0-9]{2}T[0-9]{2}[0-9]{2}"
        type="datetime-local"
        name="entry"
        id="entry"
        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        placeholder=""
      />
    </div>
  );
}
