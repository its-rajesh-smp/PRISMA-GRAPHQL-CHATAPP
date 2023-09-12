import { useEffect } from "react";
import MyRoutes from "../Routes/MyRoutes";
import "./App.css";
import gql from "graphql-tag";
import client from "../service/service";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../store/reducers/authSlice";
import Header from "../components/Header";

const GETUSER = gql`
  query GETUSER {
    getUser {
      name
      email
      id
      idToken
    }
  }
`;

function App() {
  const dispatch = useDispatch();
  const { authStatus } = useSelector((state) => state.authSlice);

  // Getting The User With Local idToken
  useEffect(() => {
    (async () => {
      const idToken = localStorage.getItem("soho");
      if (!idToken) return;
      const { data } = await client.query({
        query: GETUSER,
        context: {
          headers: {
            Authorization: idToken,
          },
        },
      });
      dispatch(authUser(data.getUser));
    })();
  }, []);

  return (
    <div>
      {authStatus && <Header />}
      <div className=" p-5">
        <MyRoutes />
      </div>
    </div>
  );
}

export default App;
