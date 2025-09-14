'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@web-ui/store';
import { SettingsMenu } from '@web-ui/components/settings/SettingsMenu';
import { useParams } from 'next/navigation';
import { JSX } from 'react';
import { SettingsProjectGeneral } from './project/SettingProjectGeneral';
import { SettingsProjectGenWorkers } from './project/SettingProjectGenworkers';
import { SettingsTeamGeneral } from './team/SettingTeamGeneral';
import { SettingsTeamGenWorkers } from './team/SettingTeamGenworkers';
import { SettingsAccount } from './account/SettingsAccount';

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ slug: string[] }>();
  const path = ['settings', ...(params?.slug || [])];

  if (!path) return null;

  console.log('path:', path);
  const settings = {
    settings: {
      index: <>Settings Home</>,
      general: {
        index: <>General Settings</>,
      },
      project: {
        index: <SettingsProjectGeneral />,
        general: { index: <SettingsProjectGeneral /> },
        genworkers: { index: <SettingsProjectGenWorkers /> },
      },
      team: {
        index: <SettingsTeamGeneral />,
        general: { index: <SettingsTeamGeneral /> },
        genworkers: { index: <SettingsTeamGenWorkers /> },
      },
      account: {
        index: <SettingsAccount />,
      },
    },
  };

  let currentPage = settings;
  let pageToRender = null as JSX.Element | null;

  path.forEach((segment, index) => {
    if (pageToRender !== null) return;
    if (index !== path.length - 1) {
      currentPage = currentPage[segment];
      if (!currentPage) pageToRender = <>Not Found</>;
    }
  });
  pageToRender = pageToRender || (currentPage[path[path.length - 1]]['index'] as JSX.Element | null);
  

  if (Object.keys(currentPage[path[path.length - 1]]).filter((key) => key !== 'index').length === 0) path.pop();
  else currentPage = currentPage[path[path.length - 1]];
  
  let settingsOptions = currentPage
    ? Object.keys(currentPage).filter((key) => key !== 'index').map((key) => ({name: key}))
    : [];
  console.log('settingsOptions', settingsOptions);

  
  return (
    <div>
      <div className="">
        <SettingsMenu settingsPath={path} settingsOptions={settingsOptions} />
      </div>
      <div>{pageToRender}</div>
    </div>
  );
}
