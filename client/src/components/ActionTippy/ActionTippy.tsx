import React from 'react';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/themes/light.css';
import { handleLogout } from '@/api/apiAuth';


type Props = {
    children: React.ReactElement,
}

const ActionTippy = ({children}: Props) => {

  const handleLogoutBtn = () => {
      const fetchApi = async () => {
        const response = await handleLogout();
        console.log(response);
        location.assign('/');
      };
      fetchApi();
  }
    

  return (
          <Tippy
            offset={[0,0]}
            placement='bottom-end'
            hideOnClick={true}
            trigger='click'
            interactive={true}
            render={attrs => (
                <div className="box_actionTippy" tabIndex={-1} {...attrs}>
                    <button className='actionTippy-btn' onClick={handleLogoutBtn}> Logout </button>
                </div>
    )}
  >
    {children}
  </Tippy>
  )
};

export default ActionTippy;