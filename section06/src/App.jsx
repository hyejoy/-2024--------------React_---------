import "./App.css";
import Viwer from "./components/Viewr";
import Controller from "./components/Controller";
function App() {
  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <Viwer />
      </section>
      <section>
        <Controller />
      </section>
    </div>
  );
}

export default App;
