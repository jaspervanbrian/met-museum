import MetLogo from "assets/images/met-logo.png";

const HomeLogo = () => {
  return (
    <div className="w-auto p-3 border border-2 border-red-600">
      <img
        src={MetLogo}
        alt="Logo"
        className="w-20 object-cover object-center mx-auto"
      />
    </div>
  );
};

export default HomeLogo;
