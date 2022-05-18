import "./App.css";
import logo from "./assets/logo.png";
import MainContainer from "./components/MainContainer/MainContainer";
function App() {
  return (
    <div className="App">
      <div className="header">
        <span className="logo">
          <img src={logo} alt="brand-logo" className="logo-image" />
        </span>
        <div className="headings">
          <span className="heading-1">YOUR SPOTTABL TEAM</span>
          <span className="heading-2">
            Spottabl supports you all throughout
          </span>
        </div>
      </div>
      <MainContainer />
    </div>
  );
}

export default App;
