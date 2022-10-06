import { ChangeEvent } from "react";

type SearchProps = {
  value: string;
  onChange: (search: string) => void;
  // Lodash having bugs on types
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/50200
  handleSearchChange: any;
};

const Search = ({ value, onChange, handleSearchChange }: SearchProps) => {
  return (
    <>
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
          placeholder="Search"
          required
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const search = e.target.value;
            onChange(search);
            handleSearchChange(search);
          }}
        />
      </div>
    </>
  );
};

export default Search;
