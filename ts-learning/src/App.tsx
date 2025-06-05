import "./App.css";
import { User } from "./components/User/User";

function App() {
  return (
    <>
      <h1>User</h1>
      <User firstName="John" lastName="Doe" age={30} />
    </>
  );
}

export default App;
