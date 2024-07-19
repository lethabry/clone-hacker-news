import SortItem from './SortItem.js';
import { ISort } from '../utils/iterfaces.js';

type TSorting = {
  sortingList: ISort[];
  onSortClick: (name: string) => void;
};

export default function Sorting({ sortingList, onSortClick }: TSorting) {
  return (
    <ul className="sorting" aria-label="Сортировка новостей">
      {sortingList.map((el, id) => (
        <SortItem
          key={id}
          sortName={el.name}
          isActive={el.isActive}
          onClick={onSortClick}
        />
      ))}
    </ul>
  );
}
