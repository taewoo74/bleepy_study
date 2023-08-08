import { CiSearch } from 'react-icons/ci';
import { ChangeEvent } from 'react';

interface searchFilterType {
  search: string;
  onChagneSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchFilter = ({ search, onChagneSearch }: searchFilterType) => {
  return (
    <div className="flex relative">
      <div>Search</div>
      <input
        className="ml-[5px] border border-b mb-[5px] pl-[4px]"
        type="text"
        value={search}
        onChange={(event) => onChagneSearch(event)}
      />
      <CiSearch className="top-[5px] right-[5px] absolute " />
    </div>
  );
};

export default SearchFilter;
