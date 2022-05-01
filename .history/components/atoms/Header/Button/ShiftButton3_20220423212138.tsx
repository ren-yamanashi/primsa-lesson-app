import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link_mui from "@mui/material/Link";
import ListIcon from "@mui/icons-material/List";
const ShiftButton_Simple = (props) => {
  return (
    <>
      <Link_mui href={props.goLink}>
        <ListItem button key="Shift">
          <ListItemIcon>
            <ListIcon sx={{ color: "e3f2fd", mt: 2 }} />
          </ListItemIcon>
          <ListItemText
            primary="シフト"
            sx={{ color: "e3f2fd", fontSize: "13px", mt: 2.5 }}
          />
        </ListItem>
      </Link_mui>
    </>
  );
};

export default ShiftButton_Simple;