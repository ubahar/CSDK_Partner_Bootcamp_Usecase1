import * as React from "react";

import { Link, LinkProps } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import Home from "@mui/icons-material/Home";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

// const StyledLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
//   function StyledLink(itemProps, ref) {
//     return <Link ref={ref} {...itemProps} role={undefined} />;
//   }
// );

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  return (
    <ListItemButton component={Link} to={to}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItemButton>
  );
}

export const mainListItems = (
  <React.Fragment>
    <div className="Nav">
      <ListItemLink to="/" primary="Healthcare insights" icon={<Home />} />
      <ListItemLink
        to="/page1"
        primary="Dark mode example"
        icon={<LooksOneIcon />}
      />
    </div>
  </React.Fragment>
);

export const secondaryListItems = <React.Fragment></React.Fragment>;
