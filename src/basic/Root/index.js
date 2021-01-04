import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import Popup from '../Popup';
import Toast from '../Toast';

const Root = props => {
  return (
    <View 
      style={{ flex: 1 }}
    >
      { props.children }
      <Popup />
      <Toast />
    </View>
  );
};

Root.propTypes = {
  ...ViewPropTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ])
};

export default Root;
