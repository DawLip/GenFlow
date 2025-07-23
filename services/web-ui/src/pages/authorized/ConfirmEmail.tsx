import { services_config } from '@libs/shared/src/services_config';
import { Button } from '@web-ui/components/Button';
import TextInput from '@web-ui/components/inputs/TextInput';
import { AppDispatch } from '@web-ui/store';
import { verifyEmailThunk } from '@web-ui/store/thunks/client/verifyEmailThunk';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  
  const [verificationCode, setVerificationCode] = useState('');

  const handleSendAgain = async () => axios.post(`${services_config.service_url.gateway_web_ui}/api/auth/send-verification-email`);

  const handleVerify = () => dispatch(verifyEmailThunk({verificationCode}));

  return (
    <div className="min-h-screen pl-16 pt-16 bg-bg inline-flex justify-start items-start gap-16 overflow-hidden">
      <div className="flex-1 self-stretch inline-flex flex-col justify-start items-center gap-2.5">
        <img src='/images/logo_full.svg' className='w-full'/>
      </div>
      <div className="flex-1 self-stretch pb-16 inline-flex flex-col justify-start items-center gap-16">
        <div className="flex-1 flex flex-col justify-between items-start">
          <div className="flex-col justify-start items-center gap-24">
            <div className="self-stretch flex flex-col justify-start items-center gap-4">
              <div className="justify-start text-white text-7xl font-bold font-['Playfair_Display']">
                Confirm Email
              </div>
              <div className="text-center justify-start text-white text-xl font-normal font-['Inter']">
                Check Your email account and verify email address.
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-center gap-8">
            <TextInput label='Enter your verification code' placeholder='123456' value={verificationCode} setValue={setVerificationCode} />
            <Button label='Verify' onClick={handleVerify} className="w-full" />
          </div>
          <div className="self-stretch flex flex-col justify-start items-center gap-8">
            <Button label='Send verification email again' onClick={handleSendAgain} className="w-full" type='outline'/>
          </div>
        </div>
      </div>
    </div>
  );
}
