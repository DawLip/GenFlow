'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@web-ui/store';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { services_config } from '@libs/shared/src/services_config';
import Cookies from 'js-cookie';


export default function Page() {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const params = useParams<{ teamId: string[] }>();
	const [team, setTeam] = useState<any>(null);
	console.log(params)

	useEffect(() => {
		const token = Cookies.get('token');
		if(token===undefined) router.push('/login');

		const fun = async () => {
			const url = `${services_config.service_url.gateway_web_ui}/api/teams/${params?.teamId}`
			console.log('Fetching team data from:', url);
			const { data } = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				}
			});
			setTeam(data.team);
			console.log('Fetched team data:', data);
		};
		fun();
	}, [params?.teamId]);

	const handleJoinTeam = async () => {
		const token = Cookies.get('token');
		const userId = Cookies.get('userId');
		const url = `${services_config.service_url.gateway_web_ui}/api/teams/${params?.teamId}/join`;
		console.log('Joining team via:', url);
		const { data } = await axios.post(url, {id: userId}, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			}
		});
		console.log('Join team response:', data);
		router.push('/dashboard');
	}

	return (
		<div className="flex-col grow self-stretch flex-1">
			You have been invited to join the team: {team ? team.name : 'Loading...'}.
			<div className='' onClick={handleJoinTeam}>Join</div>
		</div>
	);
}
