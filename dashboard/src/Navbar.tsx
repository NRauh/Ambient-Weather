import { BottomNavigation, BottomNavigationAction, withStyles } from '@material-ui/core';
import * as React from 'react';

const styles = {
  root: {
    bottom: 0,
    width: '100vw',
    position: 'absolute' as any,
  },
};

export const BottomNavbar = (props: any) => (
  <BottomNavigation
    value={props.page}
    showLabels={true}
    onChange={props.onChange}
    style={styles.root}
  >
    <BottomNavigationAction label="Weather" />
    <BottomNavigationAction label="Colors" />
    <BottomNavigationAction label="Settings" />
  </BottomNavigation>
);

export const Navbar = withStyles(styles)(BottomNavbar);
