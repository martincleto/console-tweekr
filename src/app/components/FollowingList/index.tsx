import React from 'react';
import { connect } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

import { setSidebarCollapsed } from '@slices/app';

import './styles.less';


type FollowingListProps = {
  setSidebarCollapsed: ActionCreatorWithPayload<boolean>;
  users: any[];
}

const FollowingList: React.FC<FollowingListProps> = ({
  setSidebarCollapsed,
  users,
}) => {
  return (
    <div className="following-list">
      <p>Your are following to</p>
      <ul>
        {users && users.map((user, index) => (
          <li key={index}>
            <Link
              to={`/wall/${user.id}`}
              onClick={() => setSidebarCollapsed(true)}
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};  

export default connect(null, { setSidebarCollapsed })(FollowingList);
