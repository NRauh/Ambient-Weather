jest.mock('../store/store');
jest.mock('../store');
import * as React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ColorsPage from './Colors';
import { Dialog } from 'material-ui';
import { updateSingleColor, getColors, store } from '../store';

beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() });
});

describe('<ColorsPage />', () => {
  let colorsPage: shallow<ColorsPage>;

  beforeEach(() => {
    colorsPage = shallow(<ColorsPage />);
  });

  it('should set the colors from the store', () => {
    expect(store.subscribe).toHaveBeenCalled();
  });

  it('should request to get the colors', () => {
    expect(getColors).toHaveBeenCalled();
  });

  describe('closeDialog', () => {
    it('should close the dialog and reset the colors', () => {
      colorsPage.find('ListItem[primaryText="Clear"]').first().simulate('click');
      expect(colorsPage.state('pendingColor')).not.toBe(null);
      expect(colorsPage.state('colorToUpdate')).not.toBe(null);
      expect(colorsPage.state('dialogOpen')).toBe(true);

      colorsPage.instance().closeDialog(false)();
      expect(colorsPage.state('pendingColor')).toBe(null);
      expect(colorsPage.state('colorToUpdate')).toBe(null);
      expect(colorsPage.state('dialogOpen')).toBe(false);
    });

    it('should run updateSingleColor if given true', () => {
      colorsPage.instance().closeDialog(false)();
      expect(updateSingleColor).not.toHaveBeenCalled();

      colorsPage.setState({ colorToUpdate: 'clear', pendingColor: '#7ca983' });
      colorsPage.instance().closeDialog(true)();
      expect(updateSingleColor).toHaveBeenCalledWith('clear', '#7ca983');
    });
  });

  describe('updatePendingColor', () => {
    it('should update the pendingColor', () => {
      expect(colorsPage.state('pendingColor')).toBe(null);
      colorsPage.instance().updatePendingColor({ hex: '#aaa' });
      expect(colorsPage.state('pendingColor')).toBe('#aaa');
    });

    it('should run from changing the color in the color picker', () => {
      colorsPage.find('ColorPicker').first().simulate('changeComplete', { hex: '#ababab' });
      expect(colorsPage.state('pendingColor')).toBe('#ababab');
    });
  });

  describe('color list', () => {
    it('should render seven items', () => {
      expect(colorsPage.find('ListItem')).toHaveLength(7);
    });

    it('should set colorToUpdate and pendingColor when clicked', () => {
      expect(colorsPage.state('colorToUpdate')).toBe(null);
      expect(colorsPage.state('pendingColor')).toBe(null);

      colorsPage.find('ListItem[primaryText="Clear"]').first().simulate('click');
      expect(colorsPage.state('colorToUpdate')).toBe('clear');
      expect(colorsPage.state('pendingColor')).toBe('#ccc');

      colorsPage.find('ListItem[primaryText="Wind"]').first().simulate('click');
      expect(colorsPage.state('colorToUpdate')).toBe('wind');
      expect(colorsPage.state('pendingColor')).toBe('#bbb');

      colorsPage.find('ListItem[primaryText="Partly Cloudy"]').first().simulate('click');
      expect(colorsPage.state('colorToUpdate')).toBe('partlyCloudy');
      expect(colorsPage.state('pendingColor')).toBe('#aaa');

      colorsPage.find('ListItem[primaryText="Cloudy"]').first().simulate('click');
      expect(colorsPage.state('colorToUpdate')).toBe('cloudy');
      expect(colorsPage.state('pendingColor')).toBe('#000');

      colorsPage.find('ListItem[primaryText="Rain"]').first().simulate('click');
      expect(colorsPage.state('colorToUpdate')).toBe('rain');
      expect(colorsPage.state('pendingColor')).toBe('#999');

      colorsPage.find('ListItem[primaryText="Snow"]').first().simulate('click');
      expect(colorsPage.state('colorToUpdate')).toBe('snow');
      expect(colorsPage.state('pendingColor')).toBe('#888');

      colorsPage.find('ListItem[primaryText="Fog"]').first().simulate('click');
      expect(colorsPage.state('colorToUpdate')).toBe('fog');
      expect(colorsPage.state('pendingColor')).toBe('#777');
    });

    it('should open the dialog when clicking an item', () => {
      colorsPage.find('ListItem[primaryText="Clear"]').first().simulate('click');
      expect(colorsPage.state('dialogOpen')).toBe(true);
    });
  });
});
