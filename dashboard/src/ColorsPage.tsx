import * as React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import { ColorDialog } from './ColorDialog';
import { DashboardState } from './store/store';
import { connect } from 'react-redux';
import { Color } from './types';
import { CONDITION_COLOR_ACTIONS } from './store/colors.reducer';

export interface ConditionColorListState {
  clear: Color;
  windy: Color;
  partlyCloudy: Color;
  cloudy: Color;
  rain: Color;
  snow: Color;
  fog: Color;
}

export interface ConditionColorListProps extends ConditionColorListState {
  onColorClick: (condition: keyof ConditionColorListState) => (event: any) => void;
}

export interface ColorsPageProps {
  colors: ConditionColorListState;
  onSave: (color: Color, condition: keyof ConditionColorListState) => void;
}

export function colorStyles(color: Color) {
  const styles = {
    backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
  };
  return styles;
}

export const ConditionColorList = (props: ConditionColorListProps) => ( 
  <List>
    <ListItem button={true} onClick={props.onColorClick('clear')}>
      <Avatar style={colorStyles(props.clear)} />
      <ListItemText primary="Clear" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('windy')}>
      <Avatar style={colorStyles(props.windy)} />
      <ListItemText primary="Windy" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('partlyCloudy')}>
      <Avatar style={colorStyles(props.partlyCloudy)} />
      <ListItemText primary="Partly Cloudy" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('cloudy')}>
      <Avatar style={colorStyles(props.cloudy)} />
      <ListItemText primary="Cloudy" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('rain')}>
      <Avatar style={colorStyles(props.rain)} />
      <ListItemText primary="Rain" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('snow')}>
      <Avatar style={colorStyles(props.snow)} />
      <ListItemText primary="Snow" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('fog')}>
      <Avatar style={colorStyles(props.fog)} />
      <ListItemText primary="Fog" />
    </ListItem>
  </List>
);

class ColorsPage extends React.Component<ColorsPageProps> {
  state: {
    color: Color,
    forCondition: keyof ConditionColorListState,
    dialogOpen: boolean,
  };

  constructor(props: ColorsPageProps) {
    super(props);

    this.state = {
      color: {
        red: 100,
        green: 100,
        blue: 100,
      },
      forCondition: 'clear',
      dialogOpen: false,
    };
  }

  openColorDialog = (condition: keyof ConditionColorListState) => {
    return (event: any) => {
      this.setState({
        color: this.props.colors[condition],
        dialogOpen: true,
        forCondition: condition,
      });
    };
  };

  closeColorDialog = (save: boolean) => {
    if (save) {
      this.props.onSave(this.state.color, this.state.forCondition);
    }

    this.setState({
      dialogOpen: false,
      forCondition: null,
    });
  };

  changeColor = (color: Color) => {
    this.setState({ color });
  };

  render() {
    return (
      <div>
        <h1>Colors</h1>

        <ConditionColorList
          clear={(this.props as ColorsPageProps).colors.clear}
          windy={(this.props as ColorsPageProps).colors.windy}
          partlyCloudy={(this.props as ColorsPageProps).colors.partlyCloudy}
          cloudy={(this.props as ColorsPageProps).colors.cloudy}
          rain={(this.props as ColorsPageProps).colors.rain}
          snow={(this.props as ColorsPageProps).colors.snow}
          fog={(this.props as ColorsPageProps).colors.fog}
          onColorClick={this.openColorDialog}
        />
        <ColorDialog
          dialogOpen={this.state.dialogOpen}
          forCondition={this.state.forCondition}
          color={this.state.color}
          onColorChange={this.changeColor}
          onDialogClose={this.closeColorDialog}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: DashboardState) => {
  return {
    colors: state.conditionColors,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSave: (color: Color, condition: keyof ConditionColorListState) => {
      const action = {
        type: CONDITION_COLOR_ACTIONS.SET_CONDITION,
        value: color,
        color: condition,
      };

      dispatch(action);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorsPage);
