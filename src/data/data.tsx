import { GridColDef } from '@mui/x-data-grid';

const navigationBarData = [
  { title: '홈', href: '/home' },
  {
    title: '인사이트',
    href: '/insight',
    side: [
      { title: '인사이트1', href: '/insight' },
      { title: '인사이트2', href: '/insight' },
    ],
  },
  {
    title: '리워드 관리',
    href: '/reward',
    side: [
      { title: '리워드 설정', href: '/' },
      { title: '리워드 지급처리', href: 'insight/MAU' },
    ],
  },
  { title: '사용자 스코어 현황', href: '/' },
  { title: '게임 관리', href: '/' },
  { title: '요금제 정보', href: '/' },
  { title: '공지사항/FAQ', href: '/' },
  { title: '문의하기', href: '/' },
  { title: '권한 관리', href: '/' },
];

const dauColumns: GridColDef[] = [
  { field: 'date', headerName: '날짜', width: 190, sortable: true },
  { field: 'visitCount', headerName: '방문횟수', width: 190 },
  { field: 'dau', headerName: '일일활성사용자(DAU)', width: 190 },
  { field: 'evedau', headerName: '전일대비(DAU)', width: 190 },
  { field: 'newVisitorCount', headerName: '신규 방문자 수', width: 190 },
  { field: 'returningVisitorCount', headerName: '재방문자수', width: 188 },
];

const columns2: GridColDef[] = [
  { field: 'date', headerName: '연.월', width: 228, sortable: true },
  { field: 'visitCount', headerName: '방문횟수', width: 228 },
  { field: 'mau', headerName: '월간활성사용자 (MAU)', width: 228 },
  { field: 'prevmau', headerName: '전월대비(MAU)', width: 228 },
  { field: 'returningVisitorCount', headerName: '월간 방문자수', width: 226 },
];

export { navigationBarData, dauColumns, columns2 };
