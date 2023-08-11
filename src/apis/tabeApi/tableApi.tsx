import { tableApi } from './table.tsx';

interface TableDataType {
  searchOption: string;
  page: number;
  pageSize: number;
}

const TableData = async (params: TableDataType) => {
  try {
    const { data } = await tableApi.get(`clients`, { params });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { TableData };
