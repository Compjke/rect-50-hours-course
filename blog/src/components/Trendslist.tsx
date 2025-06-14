const trends = [
  {
    title: "Be the Person You Are on Vacation",
    author: "Maren Torff",
  },
  {
    title: "Hate NFTs? I have some bad news...",
    author: "Zain Levin",
  },
  {
    title: "The real impact of dark UX patterns",
    author: "Lindsey Curtis",
  },
];

export function TrendsList() {
  return (
    <div className="bg-(--test-bg) p-4 rounded-lg shadow mt-8">
      <h3 className="font-semibold text-lg mb-4">📈 Today's top trends</h3>
      <ul className="space-y-4 list-image-[url(var(--list-marker))]">
        {trends.map((trend, index) => (
          <li key={index} className="flex flex-col list-image-(--list-marker)">
            <span className="font-medium">{trend.title}</span>
            <span className="text-sm text-gray-500">By {trend.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

