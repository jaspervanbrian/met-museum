import useObjects from "hooks/useObjects";

import ObjectTile from "components/ObjectTile";

import MetLogo from "assets/images/met-logo.png";

import "./App.css";

const App = () => {
  const { objectStore, objectDictionary } = useObjects();

  return (
    <div className="bg-white">
      <div className="mt-8 mb-4">
        <img
          src={MetLogo}
          alt="Logo"
          className="w-20 object-cover object-center mx-auto"
        />
      </div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Museum Objects</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {(objectStore ?? []).map((museumObjectId) => (
            <ObjectTile museumObject={objectDictionary?.[museumObjectId]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
