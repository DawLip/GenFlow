'use client';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@web-ui/store';
import { Icon } from '@web-ui/components/Icon';
import { get } from 'lodash';
import { getGenworkerThunk } from '@web-ui/store/thunks/genworkersRepo/getGenworkerThunk';
import { addGenworkerToTeamThunk } from '@web-ui/store/thunks/genworkers/addGenworkerToTeamThunk';
import { removeGenworkerFromTeamThunk } from '@web-ui/store/thunks/genworkers/removeGenworkerFromTeamThunk';
import { useEffect, useState } from 'react';
import { addGenworkerToTeamStorageThunk } from '@web-ui/store/thunks/genworkers/addGenworkerToTeamStorageThunk';
import { removeGenworkerFromTeamStorageThunk } from '@web-ui/store/thunks/genworkers/removeGenworkerFromTeamStorageThunk';
import { setMasterGenworkerThunk } from '@web-ui/store/thunks/genworkers/setMasterGenworkerThunk';

export function SettingsTeamGenWorkers() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  const yourGenworkers = useSelector((state: any) => state.client.genworkers);
  const teamGenworkersIds = useSelector((state: any) => state.team.genworkers);
  const [teamGenworkers, setTeamGenworkers] = useState<any[]>([]);
  const genworkers = useSelector((state: any) => state.genworkersRepository.genworkers);

  useEffect(() => {
    setTeamGenworkers([]);
    for (const gwId of teamGenworkersIds) {
      const gw = genworkers[gwId];
      if (gw) setTeamGenworkers((prev) => [...prev, gw]);
      else dispatch(getGenworkerThunk({id: gwId}));
    }
  }, [teamGenworkersIds, genworkers]);

  const masterGenworkerId = useSelector((state: any) => state.team.masterGenworker);
  const storageGenworkersIds: any[] = useSelector((state: any) => state.team.storageGenworkers);


  const yourGenWorkersToRender = yourGenworkers.map(gw => ({...gw, moveBechavior: teamGenworkers.map(gw => gw.id).includes(gw.id)?'REMOVE':'ADD'}));
  const teamGenWorkersToRender = teamGenworkers.map(gw => ({...gw, isMaster: gw.id === masterGenworkerId, isStorage: storageGenworkersIds.includes(gw.id), moveBechavior: "REMOVE"}));

  return (
    <div className="grow self-stretch flex-1 p-8 inline-flex justify-start items-start gap-8 overflow-hidden">
      <div className="grow flex-1 flex justify-start items-start gap-8">
          <GenWorkerList listName={"Teams GenWorkers"} genworkers={teamGenWorkersToRender} showControls={true}/>
          <GenWorkerList listName={"Yours GenWorkers"} genworkers={yourGenWorkersToRender} showControls={false}/>
      </div>
    </div>
  );
}

const GenWorkerList = ({ genworkers, listName, showControls }: { genworkers: any[]; listName: string; showControls: boolean }) => {
  return (
    <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
      <div className="justify-start text-white text-5xl font-normal font-['Playfair'] leading-[48px]">
        {listName}
      </div>
      <div className="self-stretch flex flex-col justify-start items-start">
        {genworkers.map((genworker) => (
          <GenWorkerListItem
            key={genworker.id}
            genworker={genworker}
            showControls={showControls}
          />
        ))}
      </div>
    </div>
  );
};

const GenWorkerListItem = ({ genworker, showControls }: { genworker: any; showControls: boolean }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveGenworker = (genworker: any) => dispatch(removeGenworkerFromTeamThunk(genworker));
  const handleAddGenworker = (genworker: any) => dispatch(addGenworkerToTeamThunk(genworker));

  const handleSwitchIsStorage = (genworker: any) => {
    if(genworker.isStorage) dispatch(removeGenworkerFromTeamStorageThunk(genworker))
    else dispatch(addGenworkerToTeamStorageThunk(genworker))
  };
  const handleSetMasterGenworker = (genworker: any) =>  dispatch(setMasterGenworkerThunk(genworker))
  

  return (
    <div className="self-stretch px-1 inline-flex justify-between items-center overflow-hidden">
      <div className="flex-1 py-2 flex justify-start items-center">
        <div className="w-32 justify-start text-white text-base font-bold font-['Inter'] leading-none">
          {genworker.name}
        </div>
        <div className="justify-start text-white text-base font-normal font-['Inter'] leading-none">
          {genworker.ownerName}
        </div>
      </div>
      <div className="flex justify-start items-center gap-8">
        <div className="flex justify-start items-center gap-4">
          {showControls && <Icon name="crown" size={24} color={genworker.isMaster ? "#9850F6" : "#555"} onClick={() => handleSetMasterGenworker(genworker)}/>}
          {showControls && <Icon name="storage" size={24} color={genworker.isStorage ? "#9850F6" : "#555"} onClick={() => handleSwitchIsStorage(genworker)}/>}
        </div>
        <div className="cursor-pointer">
          {genworker.moveBechavior == "ADD" && <Icon name="plus" size={24} color="#fff9" onClick={() => handleAddGenworker(genworker)}/>}
          {genworker.moveBechavior == "REMOVE" && <Icon name="minus" size={24} color="#fff9" onClick={() => handleRemoveGenworker(genworker)}/>}
        </div>
      </div>
    </div>
  );
};
