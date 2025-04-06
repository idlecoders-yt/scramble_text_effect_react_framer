import { ScrambleText } from "./component/ScrambleText";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(to top right,transparent,skyblue,dodgerblue)",
        margin: 0,
        padding: 0,
        fontSize: "4rem",
        fontWeight: 800,
        fontFamily: "serif",
      }}
    >
      <ScrambleText>Idlecoders</ScrambleText>
    </div>
  );
}

export default App;
