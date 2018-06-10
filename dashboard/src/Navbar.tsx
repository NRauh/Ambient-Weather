import { BottomNavigation, BottomNavigationAction, withStyles } from '@material-ui/core';
import * as React from 'react';
import { DashboardState, ACTIONS } from './store';
import { connect } from 'react-redux';

const styles = {
  root: {
    bottom: 0,
    width: '100vw',
    position: 'absolute' as any,
  },
};

export interface BottomNavbarProps {
  onChange: (event: any, value: number) => void;
  page: number;
}

export const BottomNavbar = (props: BottomNavbarProps) => (
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

const mapStateToProps = (state: DashboardState) => {
  return {
    page: state.app.page,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onChange: (event, value) => {
    dispatch({ value, type: ACTIONS.SET_PAGE });
  },
});

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BottomNavbar));
