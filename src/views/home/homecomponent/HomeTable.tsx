import { useState, useEffect } from 'react';
import { TableData } from '../../../apis/testApi/testApi.tsx';
import TableComponent from '../../../components/TableComponent';

export interface colunmsType {
  name: string;
  datakey: string;
  id: number;
}

export interface rowDataType {
  tableCustom: (dataKey: string) => string;
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
    { name: '회사이름', datakey: 'companyName', id: 1 },
    { name: '이메일', datakey: 'email', id: 2 },
    { name: '서비스 카테고리', datakey: 'serviceCategoryName', id: 3 },
    { name: '서비스 이름', datakey: 'serviceName', id: 4 },
    { name: '등록시간', datakey: 'registeredAt', id: 5 },
    { name: '계약상태', datakey: 'contractStatus', id: 6 },
  ];

  const tableCustom = (dataKey: string) => {
    if (dataKey == 'serviceCategoryName') {
      return ' row-red';
    } else {
      return '';
    }
  };

  const getTableData = async () => {
    const params = {
      searchOption: 'SERVICE_NAME',
    };
    const tableData = await TableData(params);

    const result: rowDataType[] = [];
    tableData.data.forEach((one: rowDataType) => {
      const arr = {
        ...one,
        tableCustom: (dataKey: string) => tableCustom(dataKey),
      };
      result.push(arr);
    });

    setRowData(result);
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
