import { Layout } from "antd";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import { useAppDispatch } from "./store/store";
import { useEffect } from "react";
import { setAuth, setUser } from "./store/authSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(setAuth(true));
      dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    }
  }, []);

  return (
    <Layout>
      <Navbar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
}

export default App;
