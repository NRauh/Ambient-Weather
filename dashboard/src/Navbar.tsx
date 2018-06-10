import * as React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  withStyles,
  Icon,
} from '@material-ui/core';
import { DashboardState, ACTIONS } from './store';
import { connect } from 'react-redux';

const styles = (theme) => {
  return {
    root: {
      bottom: 0,
      width: '100vw',
      position: 'absolute' as any,
      backgroundColor: theme.palette.background.paper,
      borderTop: '1px solid',
      borderTopColor: theme.palette.divider,
    },
  };
};

export interface BottomNavbarProps {
  onChange: (event: any, value: number) => void;
  classes: {
    root: string;
  };
  page: number;
}

export const BottomNavbar = (props: BottomNavbarProps) => (
  <BottomNavigation
    value={props.page}
    showLabels={true}
    onChange={props.onChange}
    className={props.classes.root}
  >
    <BottomNavigationAction label="Weather" icon={<Icon>wb_sunny</Icon>} />
    <BottomNavigationAction label="Colors" icon={<Icon>palette</Icon>} />
    <BottomNavigationAction label="Settings" icon={<Icon>settings</Icon>} />
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
