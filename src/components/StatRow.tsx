const StatRow = ({ title, stats }: { title: string; stats: { [key: string]: number } }) => (
  <div>
    <h3 className='font-semibold mb-2'>{title}</h3>
    <div className='space-y-1'>
      {Object.entries(stats).map(([name, count]) => (
        <div key={name} className='flex items-center gap-2'>
          <span className='text-sm'>{name}</span>
          <div className='flex-1 border-b border-dotted border-gray-300'></div>
          <span className='text-sm font-medium'>{count}x</span>
        </div>
      ))}
    </div>
  </div>
);

export default StatRow;
