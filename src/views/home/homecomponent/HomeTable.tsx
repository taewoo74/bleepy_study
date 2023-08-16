import { useState, useEffect } from 'react';
import { TableData } from '../../../apis/tabeApi/tableApi.tsx';
import TableComponent from '../../../components/TableComponent/TableComponent.tsx';
import  testTableData from  '../../../mocks/testApi.tsx'

export interface colunmsType {
  name: string;
  datakey: string;
  id: number;
}

export interface rowDataType {
  [key: string]: string | any;
  id:number;
  tableCustom: (dataKey: string) => string;
  serviceName: string;
  companyName: string;
  serviceCategoryName: string;
  email: string;
  registeredAt: string;
  contractStatus: string;
  serviceLogoImageUrl: string;
  filter: boolean;
}

export interface pageDataType {
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

const HomeTable = () => {
  const [rowData, setRowData] = useState<rowDataType[]>([]);
  const [pageData, setPageData] = useState({
    page: 1,
    pageSize: 10,
    totalElements: 10,
    totalPages: 0,
  });

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

  const onChangePage = (page: number) => {
    pageData.page = page;
    setPageData(pageData);
    getTableData();
  };

  const getTableData = async () => {
    const params = {
      searchOption: 'SERVICE_NAME',
      page: pageData.page,
      pageSize: pageData.pageSize,
    };
    const tableData = await testTableData(params);
    // const tableData = await TableData(params);
    const pagingInfo = tableData.pagingInfo;
    const page = {
      page: pageData.page,
      pageSize: pageData.pageSize,
      totalElements: pagingInfo.totalElements,
      totalPages: pagingInfo.totalPages,
    };
    setPageData(page);

    const result: rowDataType[] = [];
    tableData.data.forEach((one: rowDataType) => {
      const arr = {
        ...one,
        tableCustom: (dataKey: string) => tableCustom(dataKey),
        filter: true,
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
      <TableComponent
        colunms={columns}
        rowData={rowData}
        pageData={pageData}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default HomeTable;
