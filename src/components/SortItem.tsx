type TSortItem = {
  sortName: string;
  onClick: (name: string) => void;
  isActive: boolean;
};

export default function SortItem({ sortName, onClick, isActive }: TSortItem) {
  return (
    <li onClick={() => onClick(sortName)} className={isActive ? 'active' : ''}>
      <p>{sortName}</p>
    </li>
  );
}
