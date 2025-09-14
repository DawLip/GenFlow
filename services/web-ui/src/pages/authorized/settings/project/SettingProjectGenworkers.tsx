'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@web-ui/store';
import { SettingsMenu } from '@web-ui/components/settings/SettingsMenu';

export function SettingsProjectGenWorkers() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      Project Genworkers
    </div>
  );
}




