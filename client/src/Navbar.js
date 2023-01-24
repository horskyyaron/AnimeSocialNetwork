import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar({ user_name }) {
  const path = window.location.pathname;
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        AnimeSocialNetwork
      </Link>
      <ul>
        <CustomLink to="/myprofile">{user_name ? user_name : ""}</CustomLink>
        <CustomLink to="/login">Login</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
