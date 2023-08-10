import axios from 'axios';

interface TableDataType {
  searchOption: string;
  page: number;
  pageSize: number;
}

const testTableData = async (params: TableDataType) => {
  try {
    const { data } = await axios.get('/table', { params });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default testTableData;
