'use client';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@web-ui/store';
import { SettingsMenu } from '@web-ui/components/settings/SettingsMenu';
import { useEffect, useState } from 'react';
import { services_config } from '@libs/shared/src/services_config';
import axios from 'axios';

export function SettingsTeamMembers() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const team = useSelector((state:any) => state.team);

    const [email, setEmail] = useState<string>('');

    const handleSendInvitation = async () => {
        try {
            const response = await axios.post(`${services_config.service_url.gateway_web_ui}/api/teams/${team.teamId}/invite/${email}`);
            console.log('Invitation sent:', response.data);
        } catch (error) {
            console.error('Error sending invitation:', error);
        }
    };

    return (
        <div className='flex-col flex-1 gap-6'>
            <div className='flex-col gap-3'>
                <div>Owner</div>
                <div className='flex-col gap-2'>
                    <UserCard userId={team.owner} team={team}/>
                </div>
            </div>
            <div className='flex-col gap-3'>
                <div>Members</div>
                <div className='flex-col gap-2'>
                    {team.members && team.members.length > 0 ? team.members.map((memberId:string) => (
                        <UserCard key={memberId} userId={memberId} team={team}/>
                    )) : <div>No members found</div>}
                </div>
            </div>
            <div className='flex-col gap-3'>
                <div>Invited</div>
                <div className='flex-col gap-2'>
                    {team.invited && team.invited.length > 0 ? team.invited.map((memberId:string) => (
                        <UserCard key={memberId} userId={memberId} team={team}/>
                    )) : <div>No invited members found</div>}
                </div>
            </div>
            <div className='flex-col gap-2'>
                <div>Invite by email</div>
                <input type="email" placeholder="Enter email address"  value={email} onChange={(e) => setEmail(e.target.value)} />
                <button className='bg-blue-500 text-white rounded-md px-4 py-2' onClick={handleSendInvitation} >Send Invitation</button>
            </div>
        </div>
    );
}

const UserCard = ({ userId, team }: { userId: string, team: any }) => {
    const router = useRouter();
    const clientId = useSelector((state:any) => state.client.userId);
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const fun = async () => {
            const {data} = await axios.get(`${services_config.service_url.gateway_web_ui}/api/users/${userId}`);
            setUser(data.user);
            console.log('Fetched user data:', data);
        };
        if (userId) fun();
    }, [userId]);

    const handleLeaveTeam = async () => {
        try {
            const response = await axios.post(`${services_config.service_url.gateway_web_ui}/api/teams/${team.teamId}/leave`, { id: userId });
            console.log('Left team:', response.data);
            router.push('/teams');
        } catch (error) {
            console.error('Error leaving team:', error);
        }
    }
    
    return (
        <div className="w-full h-16 justify-between bg-on_bg_gray/10 rounded-lg flex items-center px-4">
            <div className="text-on_bg text-lg font-medium">{user?.username}</div>
            {(clientId=== team.owner || clientId=== userId) && <div onClick={handleLeaveTeam}>X</div>}
        </div>
    );
}


