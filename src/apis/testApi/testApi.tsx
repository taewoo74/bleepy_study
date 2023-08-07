import { testApi } from '../testApi/test.tsx';

interface TableDataType {
  searchOption: string;
}

const TableData = async (params: TableDataType) => {
  try {
    const { data } = await testApi.get(`clients`, { params });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { TableData };