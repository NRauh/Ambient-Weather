import * as React from 'react';
import { TextField } from '@material-ui/core';
import { Color } from '@light/types';

export interface ColorPickerProps {
  color: Color
  onRedChange?: (event: any) => void;
  onGreenChange?: (event: any) => void;
  onBlueChange?: (event: any) => void;
}

export const ColorPicker = (props: ColorPickerProps) => {
  const previewStyles = {
    backgroundColor: `rgb(${props.color.red}, ${props.color.green}, ${props.color.blue})`,
    width: '100%',
    height: '10rem',
  };

  return (
    <div>
      <div>
        <div style={previewStyles} />
      </div>
      <div>
        <TextField
          id="red"
          label="Red"
          value={props.color.red}
          onChange={props.onRedChange}
          type="number"
        />
        <TextField
          id="green"
          label="Green"
          value={props.color.green}
          onChange={props.onGreenChange}
          type="number"
        />
        <TextField
          id="blue"
          label="Blue"
          value={props.color.blue}
          onChange={props.onBlueChange}
          type="number"
        />
      </div>
    </div>
  );
};
