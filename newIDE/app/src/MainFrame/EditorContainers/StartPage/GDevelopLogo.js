// @flow
import * as React from 'react';
import ThemeConsumer from '../../../UI/Theme/ThemeConsumer';

const styles = {
  logo: {
    width: '100%',
  },
};

const GDevelopLogo = () => (
  <ThemeConsumer>
    {muiTheme => <img src={muiTheme.logo.src} alt="LibertyDevelop Main Logo" style={styles.logo} />}
  </ThemeConsumer>
);

export default GDevelopLogo;
