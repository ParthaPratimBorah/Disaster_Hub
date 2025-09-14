import React from 'react';
import { user, PREPAREDNESS_PALETTE } from '../../constants';

const Header: React.FC = () => (
  <div className="text-left">
    <h1 className="text-3xl font-bold" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>
      Hi {user.name},
    </h1>
    <p className="text-md" style={{ color: PREPAREDNESS_PALETTE.text_secondary }}>
      Stay Prepared Today!
    </p>
  </div>
);

export default Header;
