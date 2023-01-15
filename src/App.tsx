import { Outlet, Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/signup`}>Sign up</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Outlet />

      <hr />
      <footer>footer</footer>
    </>
  );
};
export default App;
