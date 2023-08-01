import {  GridColDef } from '@mui/x-data-grid';

const navigationBarData =
    [{ title: '홈', href: '/home' }, { title: '인사이트', href: '/', side: [{ title: 'DAU', href: '/insight/DAU' }, { title: "MAU", href: 'insight/MAU' }, { title: "요일별", href: 'insight/DATE' }, { title: "시간대별", href: 'insight/TIME' }] },
    { title: '리워드 관리', href: '/reward', side: [{ title: '리워드 설정', href: '/' }, { title: "리워드 지급처리", href: 'insight/MAU' }] }, { title: '사용자 스코어 현황', href: '/' }, { title: '게임 관리', href: '/' },
    { title: '요금제 정보', href: '/' }, { title: '공지사항/FAQ', href: '/' }, { title: '문의하기', href: '/' }, { title: '권한 관리', href: '/' }
    ]

    const columns: GridColDef[] = [
        { field: 'date', headerName: '날짜', width:200 ,sortable: true},
        { field: 'visitCount', headerName: '방문횟수', width:200 },
        { field: 'dau', headerName: '일일활성사용자(DAU)', width:200 },
        { field: 'evedau', headerName: '전일대비(DAU)', width:200 },
        { field: 'newVisitorCount', headerName: '신규 방문자 수', width:200 },
        { field: 'returningVisitorCount', headerName: '재방문자수', width:200 },
     ];


export { navigationBarData , columns } 