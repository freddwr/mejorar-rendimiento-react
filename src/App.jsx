import { lazy, memo, Suspense, useRef, useState } from "react";
import "./App.css";

const WelcomeList = lazy(() => import("@/Component/listpage/welcome"));
const WelcomePage = lazy(() => import("@/Component/welcome"));

const LayoutComponent = ({ fd, children, title = "", method = "" }) => {
  const ref = useRef(null);

  // ref?.current?.style?.backgroundColor = "blue";
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     ref.current.style.backgroundColor = "blue";
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: fd,
        justifyContent: "start",
        border: "2px #f9f9f9 solid",
        padding: "1rem",
        margin: "1rem auto",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <span>
          {title} - {method}
        </span>
        {/* <span
          key={Math.random()}
          ref={ref}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
          }}
          className="rombo"
        /> */}
      </div>
      {children}
    </div>
  );
};
/**
 * PRIMERA PARTE
 * para adentrar en la optimizacion habra codigo comentado
 * este codigo comentado es lo q no se deve realizar
 * puede descomentar para ver la accion q realiza en la consola renderizando todo tanto componente padre e hijo
 * */
/**
 *  const PrimaryPage = () => {
 *    const [counter, setCounter] = useState(0);
 *
 *    console.log("primary page");
 *    return (
 *      <>
 *        <div className=""> {counter} </div>
 *
 *        <button onClick={() => setCounter(counter + 1)}>
 *          Incrementar Estado
 *        </button>
 *        <SecondaryPage />
 *      </>
 *    );
 *  };
 */
/**
 * este codigo realiza un metodo de abtraccion
 * creando un nuevo componente <Contador /> asi no podra afectar al componente hijo
 * */
const PrimaryPage = () => {
  const Contador = () => {
    const [counter, setCounter] = useState(0);

    console.log("CONTADO PRIMARYR");
    return (
      <>
        <div className="">{counter} </div>
        {/* <button onClick={() => setCounter((count) => counter + 1)}> */}
        <button onClick={() => setCounter(counter + 1)}>
          Incrementar Estado
        </button>
      </>
    );
  };

  console.log("primary page");
  return (
    <LayoutComponent fd="column" title="PRIMARY" method="Abstraccion">
      <Contador />
      <SecondaryPage />
    </LayoutComponent>
  );
};

/**
 * SEGUNDA PARTE
 * este compoennte al incrementar el contador afecta a los componentes de abajo(sus hijos)
 * la manera de optimizar en 2 formas
 * 1 es utilizar memo => pero el renderizado aun afecta todo lo de abajo(sus hijos) solo evita q el componente de arriba no y sus hijos no renderize
 * 2 otra manera es por las props, de este modo no afectara al componente q esta debajo
 * */
const SecondaryPage = () => {
  const [counter, setCounter] = useState(0);

  console.log("secondary page");
  return (
    <LayoutComponent fd="column" title="SECONDARY" method="">
      <div className="">{counter} </div>

      {/* <button onClick={() => setCounter((count) => counter + 1)}> */}
      <button onClick={() => setCounter(counter + 1)}>
        Incrementar Estado
      </button>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ChildOnePage />
        <ChildTwoPage hijo={<ChildTwoJrPage />} />
      </div>
    </LayoutComponent>
  );
};

/**
 * la manera de evitar renderizados innecesarios con use memo pero no evita q vuelvan a cargar sus hijos
 */
const ChildOnePage = memo(() => {
  const [counter, setCounter] = useState(0);

  console.log("child one page");
  return (
    <LayoutComponent fd="column" title="CHILD ONE" method="memo">
      <div className="">{counter} </div>
      {/* <button onClick={() => setCounter((count) => counter + 1)}> */}
      <button onClick={() => setCounter(counter + 1)}>
        Incrementar Estado
      </button>
      <ChildOneJrPage />
    </LayoutComponent>
  );
});

const ChildOneJrPage = () => {
  const [counter, setCounter] = useState(0);

  console.log("child one JR page");
  return (
    <LayoutComponent fd="column" title="CHILD ONE JR" method="">
      <div className="">{counter} </div>

      {/* <button onClick={() => setCounter((count) => counter + 1)}> */}
      <button onClick={() => setCounter(counter + 1)}>
        Incrementar Estado
      </button>
    </LayoutComponent>
  );
};

/**
 * la manera de evitar renderizados innecesarios props
 */
const ChildTwoPage = (props) => {
  const [counter, setCounter] = useState(0);

  console.log("child two page");
  return (
    <LayoutComponent fd="column" title="CHILD TWO" method="props">
      <div className="">{counter} </div>

      {/* <button onClick={() => setCounter((count) => counter + 1)}> */}
      <button onClick={() => setCounter(counter + 1)}>
        Incrementar Estado
      </button>
      {/* <ChildTwoJrPage /> */}
      {props.hijo}
    </LayoutComponent>
  );
};

const ChildTwoJrPage = () => {
  const [counter, setCounter] = useState(0);

  console.log("child two JR page");
  return (
    <LayoutComponent fd="column" title="CHILD TWO JR" method="">
      <div className="">{counter} </div>

      {/* <button onClick={() => setCounter((count) => counter + 1)}> */}
      <button onClick={() => setCounter(counter + 1)}>
        Incrementar Estado
      </button>
    </LayoutComponent>
  );
};

function App() {
  const [count, setCount] = useState(0);

  console.log(import.meta.env.VITE_API_URL);

  return (
    <div className="App">
      {" "}
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <WelcomeList />
      </Suspense>
      <div className="card">
        <PrimaryPage />
      </div>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <WelcomePage />
      </Suspense>
    </div>
  );
}

export default App;
