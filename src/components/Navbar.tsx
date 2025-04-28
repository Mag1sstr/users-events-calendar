import { Menu, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logout } from "../store/authSlice";

function Navbar() {
  const dispatch = useAppDispatch();
  const { auth, user } = useAppSelector((state) => state.auth);

  return (
    <Header>
      <Row justify={"end"}>
        {auth ? (
          <>
            <div style={{ color: "white" }}>{user && user.username}</div>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ width: 100 }}
              selectable={false}
            >
              <Menu.Item onClick={() => dispatch(logout())} key={1}>
                Выйти
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ width: 100 }}
            selectable={false}
          >
            <Menu.Item key={1}>Логин</Menu.Item>
          </Menu>
        )}
      </Row>
    </Header>
  );
}

export default Navbar;
