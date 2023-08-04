import { useState, useEffect } from 'react';
import { TableData } from '../../../apis/testApi/testApi.tsx';
import TableComponent from '../../../components/TableComponent';

export interface colunmsType {
  name: string;
  key: string;
  id: number;
}

export interface rowDataType {
  [index: string]: string;
  //   id: number;
  serviceName: string;
  companyName: string;
  serviceCategoryName: string;
  email: string;
  registeredAt: string;
  contractStatus: string;
  serviceLogoImageUrl: string;
}

const HomeTable = () => {
  const [rowData, setRowData] = useState<rowDataType[]>([]);

  const columns = [
    { name: '회사이름', key: 'companyName', id: 1 },
    { name: '이메일', key: 'email', id: 2 },
    { name: '서비스 카테고리', key: 'serviceCategoryName', id: 3 },
    { name: '서비스 이름', key: 'serviceName', id: 4 },
    { name: '등록시간', key: 'registeredAt', id: 5 },
    { name: '계약상태', key: 'contractStatus', id: 6 },
  ];

  const getTableData = async () => {
    const params = {
      searchOption: 'SERVICE_NAME',
    };
    const tableData = await TableData(params);
    setRowData(tableData.data);
  };

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <div>
      <TableComponent colunms={columns} rowData={rowData} />
    </div>
  );
};

export default HomeTable;
