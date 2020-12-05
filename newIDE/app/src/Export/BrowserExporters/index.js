// @flow
import { Trans } from '@lingui/macro';
import * as React from 'react';
import { type Exporter } from '../ExportDialog';
import { browserOnlineWebExportPipeline } from './BrowserOnlineWebExport';
import { browserHTML5ExportPipeline } from './BrowserHTML5Export';
import Folder from '@material-ui/icons/Folder';
import Chrome from '../../UI/CustomSvgIcons/Chrome';

export const getBrowserExporters = (): Array<Exporter> => [
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
    key: 'browsers3export',
    exportPipeline: browserOnlineWebExportPipeline,
  },
  {
    name: <Trans>HTML5 game (zip)</Trans>,
    renderIcon: props => <Folder {...props} />,
    helpPage: '/publishing/html5_game_in_a_local_folder',
    description: (
      <Trans>
        Build the game locally as a HTML5 game. You can then publish it on
        website like Kongregate, Game Jolt, itch.io, Poki...
      </Trans>
    ),
    key: 'browserhtml5export',
    exportPipeline: browserHTML5ExportPipeline,
    advanced: true,
  },
];

/**
 * Open an URL generated from a blob, to download it with the specified filename.
 */
export const openBlobDownloadUrl = (url: string, filename: string) => {
  const { body } = document;
  if (!body) return;

  // Not using Window.openExternalURL because blob urls are blocked
  // by Adblock Plus (and maybe other ad blockers).
  const a = document.createElement('a');
  body.appendChild(a);
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  a.click();
  body.removeChild(a);
};
