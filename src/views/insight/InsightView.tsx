

const InsightView = () => {


  return (
    <div className="w-f">
      <div className="text-xl font-bold">조회기간별 방문현황 합계</div>

      <div className="mt-4 flex">
        <div className="num_container">
          <div className="font-semibold text-xs text-gray-400 mt-3 ml-3" >방문횟수</div>
        </div>
        <div className="num_container">
          <div className="font-semibold text-xs text-gray-400 mt-3 ml-3">일일활성사용자</div>
        </div>
        <div className="num_container">
          <div className="font-semibold text-xs text-gray-400 mt-3 ml-3">신규 방문자 수</div>
        </div>
        <div className="num_container">
          <div className="font-semibold text-xs text-gray-400 mt-3 ml-3">재 방문자 수</div>
        </div>
      </div>
    </div>
  );
};

export default InsightView;
