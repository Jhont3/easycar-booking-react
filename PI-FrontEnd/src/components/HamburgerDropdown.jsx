import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import { ImMenu3 } from "react-icons/im";
import styles from "./modules/header.module.css";

export const HamburgerDropdown = () => {
  const items = [
    {
      label: <Link to="/login">Login</Link>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <Link to="/register">Sign up</Link>,
      key: "1",
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
    >
      <ImMenu3 className={`${styles.menu_icon}`} />
    </Dropdown>
  );
};
