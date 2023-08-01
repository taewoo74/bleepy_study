// import { columns } from '../data/data.tsx'
import { DataGrid, GridColDef } from '@mui/x-data-grid';

type TableType = {
  tableData: any;
  columns: GridColDef[];
};

const Table = ({ tableData, columns }: TableType) => {
  return (
    <div className="w-[1140px] h-[400px]">
      <DataGrid
        rows={tableData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 100 },
          },
        }}
      />
    </div>
  );
};

export default Table;
