import React from 'react';
import { ShieldIcon, UserIcon, LockIcon } from '../../constants';
import AuthInput from '../../components/common/AuthInput';
import { useAppContext } from '../../contexts/AppContext';

interface RegisterPageProps {
  setAuthPage: (page: 'login' | 'register') => void;
  onRegisterSuccess: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setAuthPage, onRegisterSuccess }) => {
  const { PALETTE } = useAppContext();

  return (
    <div className="flex flex-col items-center text-center">
      <ShieldIcon className="w-16 h-16 mb-4" style={{ color: PALETTE.accent }} />
      <h1 className="text-3xl font-bold" style={{ color: PALETTE.text_primary }}>Create an Account</h1>
      <p className="mb-8" style={{ color: PALETTE.text_secondary }}>Register to get started</p>
      
      <div className="w-full space-y-4">
        <AuthInput icon={UserIcon} placeholder="Email" type="email" />
        <AuthInput icon={LockIcon} placeholder="Password" type="password" />
        <AuthInput icon={LockIcon} placeholder="Confirm Password" type="password" />
      </div>

      <button 
        onClick={onRegisterSuccess}
        className="w-full py-3 mt-8 rounded-xl font-semibold transition-all duration-200"
        style={{ backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_shadow }}
      >
        Register
      </button>

      <p className="mt-6 text-sm" style={{ color: PALETTE.text_secondary }}>
        Already have an account?{' '}
        <button onClick={() => setAuthPage('login')} className="font-bold" style={{ color: PALETTE.text_primary }}>
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterPage;