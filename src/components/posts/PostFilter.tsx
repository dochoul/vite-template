type Props = {
  searchKeyword: (keyword: string) => void;
  setLimitPost: (limit: number) => void;
  setOrderPost: (order: string) => void;
};

export function PostFilter({ searchKeyword, setLimitPost, setOrderPost }: Props) {
  const limit = Number(localStorage.getItem('LIMIT-POST')) || 3;

  return (
    <div>
      <input type="text" onChange={(e) => searchKeyword(e.target.value)} />
      <select defaultValue={limit} onChange={(e) => setLimitPost(Number(e.target.value))}>
        <option value="3">3개씩 보기</option>
        <option value="6">6개씩 보기</option>
        <option value="9">9개씩 보기</option>
      </select>
      <select onChange={(e) => setOrderPost(e.target.value)}>
        <option value="desc">desc</option>
        <option value="asc">asc</option>
      </select>
    </div>
  );
}
