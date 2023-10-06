import React, { useState } from 'react';

export function PostFilter(props) {
  const [limit, setLimit] = useState<number>(6); //* 몇개씩 보여줄거니?

  // useEffect(() => {
  //   fetchPosts();
  // }, [limit, order, search]);

  props.limit(limit);

  return (
    <div>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLimit(Number(e.target.value))}
      >
        <option value="3">3개씩 보기</option>
        <option value="6">6개씩 보기</option>
        <option value="9">9개씩 보기</option>
      </select>
    </div>
  );
}
