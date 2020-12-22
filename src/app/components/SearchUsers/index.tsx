import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Input, AutoComplete } from 'antd';
import { SelectProps } from 'antd/es/select';

import { setSidebarCollapsed } from '@slices/app';
import { searchUsers } from '@slices/users';

type SearchUsersProps = {
  setSidebarCollapsed: ActionCreatorWithPayload<boolean>;
};

const SearchUsers: React.FC<SearchUsersProps> = ({
  setSidebarCollapsed
}) => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);

  const searchResult = useCallback(async (query: string) => {
    const results = await searchUsers(query);

    return results.map(item => ({
      value: item.name,
      label: (
        <div>
          <Link to={`/wall/${item.id}`}>
            {item.name}
          </Link>
        </div>
      ),
    }));
  }, []);

  const handleSearch = async (value: string) => {
    if (!value || value.length < 3 ) return [];
    setOptions([]);

    const options = await searchResult(value);
    setOptions(options);
  };

  return (
    <AutoComplete
      options={options}
      onSearch={handleSearch}
      onSelect={() => {
        setOptions([]);
        setSidebarCollapsed(true);
      }}
    >
      <Input.Search
        placeholder="Search users"
        allowClear
        enterButton
      />
    </AutoComplete>
  );
};

export default connect(null, { setSidebarCollapsed })(SearchUsers);
