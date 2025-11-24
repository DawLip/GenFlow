import { AppDispatch } from '@web-ui/store';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { services_config } from '@libs/shared/src/services_config';
import { handleFetchClientThunk } from '@web-ui/store/thunks/client/fetchClientThunk';
import { createTeamThunk } from '@web-ui/store/thunks/client/createTeamThunk';

export default function Page() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const projects = useSelector((state: any) => state.projectRepo.projects);
    const userId = useSelector((state: any) => state.auth.userId);

    const [teams, setTeams] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [newTeamName, setNewTeamName] = useState<string>("");

    useEffect(() => {
        const fun = async () => {
            const {data} = await axios.get(`${services_config.service_url.gateway_web_ui}/api/users/${userId}?populateTeams=1`);
            setTeams(data.user.teams);
            setData(data);
        };
        fun();
    }, []);

    return (
        <div className="self-stretch h-[789px] inline-flex flex-col justify-start items-center gap-2.5">
            <div className="w-full max-w-[1400px] py-16 inline-flex justify-start items-start gap-16 overflow-hidden">
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
                    <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                        <div className="justify-start text-on_bg/80 text-3xl font-bold font-['Inter'] leading-loose">
                            Teams
                        </div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start">
                        {teams.map((team) => <TeamItem key={team.id} name={team.name} onClick={() => {dispatch(handleFetchClientThunk(data, team.name, true)); router.push('/select-project')}}/> )}
                    </div>
                </div>
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-8 overflow-hidden">
                    <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                        <div className="justify-start text-on_bg/80 text-3xl font-bold font-['Inter'] leading-loose">
                            Create Team
                        </div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-12">
                        <div className="self-stretch flex flex-col justify-start items-start gap-2">
                            <div className="justify-start text-on_bg/80 text-2xl font-bold font-['Inter'] leading-normal">
                                Name
                            </div>
                            <input
                                className="self-stretch border-b border-on_bg_gray/50 inline-flex justify-start items-center gap-2.5 overflow-hidden text-on_bg_gray/50 text-3xl font-normal font-['Inter']"
                                placeholder="Your team name"
                                value={newTeamName}
                                onChange={(e) => setNewTeamName(e.target.value)}
                            />
                        </div>
                        <div className="self-stretch flex flex-col justify-start items-end gap-2.5">
                            <div className="px-12 py-4 bg-primary rounded-lg inline-flex justify-center items-center gap-2.5" onClick={() => {dispatch(createTeamThunk(newTeamName)); router.refresh();}}>
                                <div className="justify-start text-white text-2xl font-bold font-['Inter'] leading-normal">
                                    Create
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const TeamItem = ({ name, onClick }: { name: string, onClick: () => void }) => {
    return (
        <div className="self-stretch py-2 inline-flex justify-between items-center" onClick={onClick}>
            <div className="justify-start text-on_bg/80 text-3xl font-normal font-['Inter'] leading-loose">
                {name}
            </div>
        </div>
    );
};
