import * as React from 'react';
import { Color, ConditionList } from '@light/types';
import { ConditionColorList } from './ConditionColorList';
import { ColorDialog } from '../color-dialog/ColorDialog';
import { DashboardState, ACTIONS } from '../store';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

export interface ColorsPageProps {
  colors: ConditionList;
  onSave: (color: Color, condition: keyof ConditionList) => void;
}

interface ColorsPageState {
  color: Color,
  forCondition: keyof ConditionList,
  dialogOpen: boolean,
}

class ColorsPage extends React.Component<ColorsPageProps, any> {
  state: ColorsPageState;

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

  openColorDialog = (condition: keyof ConditionList) => {
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
        <Typography variant="display2">Colors</Typography>

        <ConditionColorList
          conditions={this.props.colors}
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
    onSave: (color: Color, condition: keyof ConditionList) => {
      const action = {
        type: ACTIONS.SET_CONDITION_ASYNC,
        value: color,
        color: condition,
      };

      dispatch(action);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorsPage);
