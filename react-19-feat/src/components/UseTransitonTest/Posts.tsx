import { FixedSizeList } from 'react-window';

const Row = ({
  style,
  post,
}: {
  index: number;
  style: React.CSSProperties;
  post: { id: number; title: string; content: string };
}) => (
  <div style={style} className="border-b py-2">
    <h3 className="font-semibold">{post.title}</h3>
    <p>{post.content}</p>
  </div>
);

export const Posts = ({
  isPending,
  posts = [],
}: {
  isPending: boolean;
  posts: Array<{ id: number; title: string; content: string }>;
}) => {
  if (isPending) return <div>Loading data...</div>;

  return (
    <div className="w-full overflow-y-auto p-4 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-xl font-bold">Posts</h2>
      <FixedSizeList
        height={300}
        width={'100%'}
        itemCount={posts.length}
        itemSize={100}
        itemData={posts}
        overscanCount={5}
      >
        {({ index, style, data }) => <Row index={index} style={style} post={data[index]} />}
      </FixedSizeList>
    </div>
  );
};
