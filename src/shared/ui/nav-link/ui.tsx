import { NavLink as ReactNavLink } from "react-router-dom";
import { Flex } from "@mantine/core";

interface INavLink {
  to: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const NavLink = ({ to, onClick, children, icon }: INavLink) => {
  return (
    <ReactNavLink
      to={to}
      onClick={onClick}
      style={({ isActive }) => ({
        color: isActive
          ? "var(--mantine-color-violet-filled)"
          : "var(--mantine-color-purple-filled)",
      })}
    >
      <Flex display="flex" align="center" gap={3}>
        {icon}
        {children}
      </Flex>
    </ReactNavLink>
  );
};
