import ObjectList from "components/ObjectList";
import MetLogo from "assets/images/met-logo.png";

import "./App.css";

const App = () => {
  return (
    <div className="bg-white">
      <div className="mt-8 mb-4 flex justify-center">
        <div className="w-auto p-3 border border-2 border-red-600">
          <img
            src={MetLogo}
            alt="Logo"
            className="w-20 object-cover object-center mx-auto"
          />
        </div>
      </div>

      <ObjectList />
    </div>
  );
};

export default App;
