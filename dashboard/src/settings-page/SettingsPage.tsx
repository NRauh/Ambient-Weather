import * as React from 'react';
import { SettingsState, DashboardState, ACTIONS } from '../store';
import { SettingsControls } from './SettingsControls';
import { LocationInput } from './LocationInput';
import { UnitSelection } from './UnitSelection';
import { HostnameInput } from './HostnameInput';
import { connect } from 'react-redux';

export interface SettingsPageProps {
  settings: SettingsState;
  onSave: (event: SettingsState) => void;
}

interface SettingsPageState {
  settings: SettingsState,
  previousSettings: SettingsState,
}

class SettingsPage extends React.Component<SettingsPageProps, any> {
  state: SettingsPageState

  constructor(props: SettingsPageProps) {
    super(props);

    this.state = {
      previousSettings: { ...props.settings },
      settings: { ...props.settings }
    };
  }

  updateSettings = (setting: keyof SettingsState) => {
    return (event: any) => {
      this.setState({
        settings: {
          ...this.state.settings,
          [setting]: event.target.value,
        },
      });
    }
  };

  resetChanges = () => {
    this.setState({
      settings: { ...this.state.previousSettings },
    });
  };

  saveSettings = () => {
    this.props.onSave(this.state.settings);
    this.setState({ previousSettings: { ...this.state.settings } });
  }

  getCurrentLocation = () => {
    console.log('will get current location');
  };

  render() {
    return (
      <div className="settings">
        <h1>Settings</h1>
        <SettingsControls
          onResetClick={this.resetChanges}
          onSaveClick={this.saveSettings}
        />
        <LocationInput
          onLatChange={this.updateSettings('lat')}
          onLongChange={this.updateSettings('long')}
          onUseCurrentLocationClick={this.getCurrentLocation}
          lat={this.state.settings.lat}
          long={this.state.settings.long}
        />
        <UnitSelection
          unit={this.state.settings.unit}
          onUnitChange={this.updateSettings('unit')}
        />
        <HostnameInput
          hostname={this.state.settings.hostname}
          onHostnameChange={this.updateSettings('hostname')}
        />
      </div>
    );
  };
}

const mapStateToProps = (state: DashboardState) => {
  return {
    settings: {
      lat: state.settings.lat,
      long: state.settings.long,
      unit: state.settings.unit,
      hostname: state.settings.hostname,
    },
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSave: (event: SettingsPageState) => {
      const action = {
        type: ACTIONS.SET_ALL_SETTINGS,
        value: event,
      };

      dispatch(action);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
