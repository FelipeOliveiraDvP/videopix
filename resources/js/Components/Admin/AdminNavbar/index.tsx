import { UnstyledButton } from "@mantine/core";
import {
  IconArrowsExchange,
  IconDashboard,
  IconPackage,
  IconUsers,
  IconVideo,
} from "@tabler/icons-react";
import classes from "./AdminNavbar.module.css";
import { Link } from "@inertiajs/react";
import AdminButton from "../AdminButton";

const menuItems = [
  {
    link: route("admin.dashboard"),
    label: "Dashboard",
    icon: IconDashboard,
  },
  {
    link: route("admin.customers.index"),
    label: "Clientes",
    icon: IconUsers,
  },
  {
    link: route("admin.packages.index"),
    label: "Pacotes",
    icon: IconPackage,
  },
  {
    link: route("admin.videos.index"),
    label: "Videos",
    icon: IconVideo,
  },
  {
    link: route("admin.balance"),
    label: "Movimentação",
    icon: IconArrowsExchange,
  },
];

function AdminNavbar() {
  const mainLinks = menuItems.map((link) => (
    <UnstyledButton
      key={link.label}
      component={Link}
      href={link.link}
      className={classes.mainLink}
    >
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
    </UnstyledButton>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.section}>
        <AdminButton />
      </div>

      <div className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
