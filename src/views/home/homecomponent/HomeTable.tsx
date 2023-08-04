import { useState, useEffect } from 'react';
import { TableData } from '../../../apis/testApi/testApi.tsx';

const HomeTable = () => {
  const getTableData = async () => {
    const params = {
      searchOption: 'SERVICE_NAME',
    };
    const tableData = await TableData(params);
    console.log(tableData);
  };

  useEffect(() => {
    getTableData();
  }, []);

  return <div></div>;
};

export default HomeTable;
