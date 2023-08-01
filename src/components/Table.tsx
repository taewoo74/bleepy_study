// import { columns } from '../data/data.tsx'
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const columns: GridColDef[] = [
    { field: 'date', headerName: '날짜', width:190 ,sortable: true},
    { field: 'visitCount', headerName: '방문횟수', width:190 },
    { field: 'dau', headerName: '일일활성사용자(DAU)', width:190 },
    { field: 'evedau', headerName: '전일대비(DAU)', width:190 },
    { field: 'newVisitorCount', headerName: '신규 방문자 수', width:190 },
    { field: 'returningVisitorCount', headerName: '재방문자수', width:188 },
 ];


const Table = ({ tableData }: any) => {
    return (
        <div className='w-[1140px] h-[400px]'>
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
}

export default Table