type ToggleSearchProps = {
  searchBarVisible: boolean;
  setSearchBarVisible: (visible: boolean) => void;
};

const ToggleSearch = ({
  searchBarVisible,
  setSearchBarVisible,
}: ToggleSearchProps) => {
  return (
    <div className="flex self-start pl-3 absolute right-10 sm:right-14 md:right-20 lg:right-28">
      {!searchBarVisible && (
        <svg
          onClick={() => setSearchBarVisible(true)}
          aria-hidden="true"
          className="w-7 h-7 text-black cursor-pointer"
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
      )}

      {searchBarVisible && (
        <svg
          onClick={() => setSearchBarVisible(false)}
          aria-hidden="true"
          className="w-7 h-7 text-black cursor-pointer"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
    </div>
  );
};

export default ToggleSearch;
