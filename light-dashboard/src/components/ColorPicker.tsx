import * as React from 'react';
import { CustomPicker } from 'react-color';
import {
  EditableInput,
  Hue,
} from 'react-color/lib/components/common';
import { SliderSwatches } from 'react-color/lib/components/slider/SliderSwatches';

/* tslint:disable-next-line variable-name */
const HueSatPicker = ({ hex, hsl, onChange }) => {
  const styles = {
    bar: {
      height: '1.5rem',
      position: 'relative' as 'relative',
    },
    input: {
      height: '2rem',
      border: `1px solid ${ hex }`,
      padding: '0 1rem',
    },
    swatch: {
      width: '100%',
      height: '5rem',
      background: hex,
      marginBottom: '1rem',
    },
    inputContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
  };

  return (
    <div>
      <div>
        <div style={ styles.swatch } />
      </div>

      <div style={ styles.bar }>
        <Hue hsl={ hsl } onChange={ onChange } />
      </div>

      <div style={styles.bar}>
        <SliderSwatches hsl={hsl} onClick={onChange} />
      </div>

      <div style={ styles.inputContainer }>
        <EditableInput
          style={{ input: styles.input }}
          value={ hex }
          onChange={ onChange }
        />
      </div>
    </div>
  );
};

export const ColorPicker = CustomPicker(HueSatPicker);
