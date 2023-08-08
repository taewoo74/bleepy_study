import { CiSearch } from 'react-icons/ci';

const SearchFilter = () => {
  return (
    <div className="flex relative">
      <div>Search</div>
      <input
        className="ml-[5px] border border-b mb-[5px] pl-[4px]"
        type="text"
      />
      <CiSearch className="top-[5px] right-[5px] absolute " />
    </div>
  );
};

export default SearchFilter;
