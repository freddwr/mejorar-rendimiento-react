import reactLogo from "@/assets/react.svg";

function welcome() {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ textAlign: "center" }}>
        <a href="#">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="#">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2>Vite + React</h2>
    </div>
  );
}

export default welcome;
