import { NavLink as ReactNavLink } from "react-router-dom";

interface INavLink {
  to: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const NavLink = ({ to, onClick, children }: INavLink) => {
  return (
    <ReactNavLink
      to={to}
      onClick={onClick}
      style={({ isActive }) => ({
        color: isActive ? "var(--mantine-color-violet-filled)" : "",
      })}
    >
      {children}
    </ReactNavLink>
  );
};
