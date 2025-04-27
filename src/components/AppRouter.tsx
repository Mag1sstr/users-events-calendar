import { Route, Routes, useNavigate } from "react-router-dom";
import { privateRoutes, publicRoutes, RouteNames } from "../routes";
import { useEffect } from "react";
import { useAppSelector } from "../store/store";

function AppRouter() {
  const { auth } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      navigate(RouteNames.EVENT);
    } else {
      navigate(RouteNames.LOGIN);
    }
  }, [auth]);

  return auth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  );
}

export default AppRouter;
