// @flow
import { Trans } from '@lingui/macro';
import * as React from 'react';
import { type Exporter } from '../ExportDialog';
import { localHTML5ExportPipeline } from './LocalHTML5Export';
import { localOnlineWebExportPipeline } from './LocalOnlineWebExport';
import Folder from '@material-ui/icons/Folder';
import Chrome from '../../UI/CustomSvgIcons/Chrome';

export const getLocalExporters = (): Array<Exporter> => [
  {
    name: <Trans>Web (upload online)</Trans>,
    renderIcon: props => <Chrome {...props} />,
    helpPage: '/publishing/web',
    description: (
      <Trans>
        Upload your game online directly from GDevelop and share the link to
        players. Play to your game using your browser on computers and mobile
        phones.
      </Trans>
    ),
    key: 'localonlinewebexport',
    exportPipeline: localOnlineWebExportPipeline,
  },
  {
    name: <Trans>Local folder</Trans>,
    renderIcon: props => <Folder {...props} />,
    helpPage: '/publishing/html5_game_in_a_local_folder',
    description: (
      <Trans>
        Build the game locally as a HTML5 game. You can then publish it on
        website like Kongregate, Game Jolt, itch.io, Poki...
      </Trans>
    ),
    key: 'localexport',
    exportPipeline: localHTML5ExportPipeline,
    advanced: true,
  }
];
