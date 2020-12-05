// @flow
import { Trans } from '@lingui/macro';

import React, { PureComponent } from 'react';
import { List, ListItem } from '../UI/List';
import Dialog from '../UI/Dialog';
import FlatButton from '../UI/FlatButton';
import { Tabs, Tab } from '../UI/Tabs';
import { Column, Line } from '../UI/Grid';
import Window from '../Utils/Window';
import Text from '../UI/Text';
import PreferencesContext from './Preferences/PreferencesContext';
import {
  getUpdateStatusLabel,
  getUpdateButtonLabel,
  canDownloadUpdate,
  type UpdateStatus,
} from './UpdaterTools';
import Changelog from './Changelog';
import { getIDEVersion, getGDCoreVersion } from '../Version';

type Props = {
  open: boolean,
  onClose: Function,
  updateStatus: UpdateStatus,
};

type State = {|
  currentTab: string,
|};

const styles = {
  logo: {
    width: '100%',
  },
};

// There must be missing tons of people.
// If you contributed to LibertyDevelop but you're not in the list, please
// send a Pull Request on GitHub or open an issue ;)
const contributors = [
  // GitHub contributors
  {
    name: 'GyeongYun \'Xena\' Hwang',
    description:
      'Main Developer of LibertyDevelop',
  }
];

export default class AboutDialog extends PureComponent<Props, State> {
  state = {
    currentTab: 'about',
  };

  _openContributePage = () => {
    Window.openExternalURL('https://libertygame.miraheze.org/wiki/리버티게임:대문');
  };

  _openLink = (link: string) => {
    if (!link) return;

    Window.openExternalURL(link);
  };

  _changeTab = (currentTab: string) => {
    this.setState({ currentTab });
  };

  render() {
    const { open, onClose, updateStatus } = this.props;
    const { currentTab } = this.state;
    if (!open) return null;

    const updateStatusString = getUpdateStatusLabel(updateStatus.status);
    const updateButtonLabel = getUpdateButtonLabel(updateStatus.status);

    return (
      <Dialog
        actions={[
          <FlatButton
            key="website"
            label={<Trans>LibertyDevelop Website</Trans>}
            primary={false}
            onClick={() => Window.openExternalURL('https://libertygame.miraheze.org/wiki/리버티게임:대문')}
          />,
          <FlatButton
            key="close"
            label={<Trans>Close</Trans>}
            primary={false}
            onClick={onClose}
          />,
        ]}
        onRequestClose={onClose}
        cannotBeDismissed={false}
        open={open}
        maxWidth="sm"
        noMargin
      >
        <PreferencesContext.Consumer>
          {({ values, checkUpdates }) => (
            <Column noMargin>
              <img
                src="res/LD-logo.png"
                alt="LibertyDevelop logo"
                style={styles.logo}
              />
              <Tabs value={currentTab} onChange={this._changeTab}>
                <Tab label={<Trans>About LibertyDevelop</Trans>} value="about" />
                <Tab label={<Trans>What's new?</Trans>} value="changelog" />
                <Tab label={<Trans>Contributors</Trans>} value="contributors" />
              </Tabs>
              {currentTab === 'about' && (
                <React.Fragment>
                  <Column>
                    <Line>
                      <Text>
                        <Trans>
                          LibertyDevelop {getIDEVersion()} based on GDevelop.js{' '}
                          {getGDCoreVersion()}
                        </Trans>
                      </Text>
                    </Line>
                    <Line>
                      <Text>{updateStatusString}</Text>
                    </Line>
                    <Line justifyContent="center">
                      {!!updateStatusString && (
                        <FlatButton
                          label={updateButtonLabel}
                          onClick={() =>
                            checkUpdates(canDownloadUpdate(updateStatus.status))
                          }
                        />
                      )}
                    </Line>
                  </Column>
                </React.Fragment>
              )}
              {currentTab === 'changelog' && (
                <Column>
                  <Changelog />
                </Column>
              )}
              {currentTab === 'contributors' && (
                <React.Fragment>
                  <Column>
                    <Text>
                      <Trans>
                        Original GDevelop was created by Florian "4ian" Rival.
                      </Trans>
                    </Text>
                    <Text>
                      <Trans>Contributors, in no particular order:</Trans>
                    </Text>
                  </Column>
                  <List>
                    {contributors.map(contributor => (
                      <ListItem
                        key={contributor.name}
                        primaryText={contributor.name}
                        secondaryText={contributor.description}
                        secondaryTextLines={
                          contributor.description.length < 30 ? 1 : 2
                        }
                        displayLinkButton={contributor.link ? true : false}
                        onOpenLink={() =>
                          this._openLink(contributor.link || '')
                        }
                      />
                    ))}
                  </List>
                  <Column expand>
                    <Text>
                      <Trans>
                        Thanks to all users of LibertyDevelop! There must be missing
                        tons of people, please send your name if you've
                        contributed and you're not listed.
                      </Trans>
                    </Text>
                    <Line alignItems="center" justifyContent="center">
                      <FlatButton
                        label={<Trans>Contribute to LibertyDevelop</Trans>}
                        onClick={this._openContributePage}
                      />
                    </Line>
                  </Column>
                </React.Fragment>
              )}
            </Column>
          )}
        </PreferencesContext.Consumer>
      </Dialog>
    );
  }
}
