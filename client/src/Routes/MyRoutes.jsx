import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import { useSelector } from "react-redux";
import HomePage from "../Pages/HomePage";
import NotificationPage from "../Pages/NotificationPage";
import MessagePage from "../Pages/MessagePage";
function MyRoutes() {
  const { authStatus } = useSelector((state) => state.authSlice);

  return (
    <Routes>
      {authStatus ? (
        <>
          <Route path="/" Component={HomePage} />
          <Route path="/notification" Component={NotificationPage} />
          <Route path="/message/:id" Component={MessagePage} />
          <Route path="*" Component={HomePage} />
        </>
      ) : (
        <>
          <Route path="/" Component={LoginPage} />
          <Route path="*" Component={LoginPage} />
        </>
      )}
    </Routes>
  );
}

export default MyRoutes;
