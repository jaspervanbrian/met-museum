import { useState } from "react";
import ObjectList from "components/ObjectList";
import HomeLogo from "components/HomeLogo";
import ToggleSearch from "components/ToggleSearch";

import "./App.css";

const App = () => {
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  return (
    <div className="bg-white">
      <div className="mt-8 mb-4 flex justify-center px-20 sm:px-24 lg:px-28">
        <HomeLogo />
        <ToggleSearch
          searchBarVisible={searchBarVisible}
          setSearchBarVisible={setSearchBarVisible}
        />
      </div>

      <ObjectList searchBarVisible={searchBarVisible} />
    </div>
  );
};

export default App;
