'use client';

import React, { useState } from 'react';
import Checkin from '@/types/Checkin';
import { useCheckins } from '@/hooks/useCheckins';
import { ErrorMessage } from '@/components/ErrorMessage';
import { RecordCount } from '@/components/RecordCount';
import { TabContent } from '@/components/TabContent';
import { EmptyState } from '@/components/EmptyState';
import { Header } from '@/components/Header';
import { SearchForm } from '@/components/SearchForm';
import { JsonModal } from '@/components/JsonModal';

export const USC = () => {
  const [token, setToken] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [selectedJson, setSelectedJson] = useState<Checkin | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'checkins'>('summary');
  const { checkins, loading, error, fetchCheckins } = useCheckins();

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-6'>
        <Header />
        <SearchForm
          token={token}
          year={year}
          loading={loading}
          onTokenChange={setToken}
          onYearChange={setYear}
          onSubmit={() => fetchCheckins(token, year)}
        />

        {error && <ErrorMessage error={error} />}
        {checkins.length > 0 && <RecordCount count={checkins.length} />}
      </div>

      {checkins.length > 0 ? (
        <TabContent
          activeTab={activeTab}
          onTabChange={setActiveTab}
          checkins={checkins}
          onJsonView={setSelectedJson}
        />
      ) : (
        !loading && <EmptyState />
      )}

      <JsonModal
        isOpen={selectedJson !== null}
        onClose={() => setSelectedJson(null)}
        data={selectedJson}
      />
    </div>
  );
};
//
// const USC = () => {
//   const [token, setToken] = useState('');
//   const [year, setYear] = useState(new Date().getFullYear().toString());
//   const [checkins, setCheckins] = useState<Checkin[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [selectedJson, setSelectedJson] = useState<Checkin | null>(null);
//   const [activeTab, setActiveTab] = useState<'summary' | 'checkins'>('summary');
//
//   const fetchCheckins = async () => {
//     setLoading(true);
//     setError('');
//
//     try {
//       let allRecords: Checkin[] = [];
//       let page = 1;
//       const pageSize = 10;
//       const requestedYear = parseInt(year);
//       const cutoffDate = new Date(requestedYear - 1, 12, 1); // December 1st of previous year
//
//       while (true) {
//         const response = await fetch('/api/usc', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             token,
//             page,
//             pageSize,
//           }),
//         });
//
//         const data = await response.json();
//
//         if (!response.ok) {
//           setError(`HTTP error! Status: ${response.status}`);
//           return;
//         }
//
//         if (!data.success || !data.data) {
//           break;
//         }
//
//         const processedRecords = data.data
//           .filter((item: Checkin) => item.course)
//           .filter((item: Checkin) => new Date(item.created).getFullYear() === requestedYear);
//
//         // Check if the last record is too old
//         const lastRecord = data.data[data.data.length - 1];
//         if (lastRecord && new Date(lastRecord.created) < cutoffDate) {
//           allRecords = [...allRecords, ...processedRecords];
//           break;
//         }
//
//         allRecords = [...allRecords, ...processedRecords];
//
//         if (data.data.length < pageSize) {
//           break;
//         }
//
//         page++;
//       }
//
//       // Sort by date descending
//       allRecords.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
//       setCheckins(allRecords);
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className='container mx-auto p-4'>
//       <div className='mb-6'>
//         <h1 className='text-4xl font-bold mb-6 flex items-center gap-2 mt-4'>
//           Urban Sports Wrapped
//         </h1>
//         <div className='flex flex-col md:flex-row gap-4 mb-6'>
//           <input
//             type='password'
//             placeholder='Enter your USC token'
//             value={token}
//             onChange={(e) => setToken(e.target.value)}
//             className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-600'
//           />
//           <input
//             type='number'
//             placeholder='Year'
//             min='2020'
//             max={new Date().getFullYear()}
//             value={year}
//             onChange={(e) => {
//               const val = parseInt(e.target.value);
//               if (!isNaN(val) && val >= 2020 && val <= new Date().getFullYear()) {
//                 setYear(val.toString());
//               }
//             }}
//             className='w-full md:w-24 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-600'
//           />
//           <button
//             onClick={fetchCheckins}
//             disabled={!token || !year || loading}
//             className='min-w-[150px] px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
//           >
//             {loading ? (
//               <>
//                 <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//                 Loading
//               </>
//             ) : (
//               'Fetch Checkins'
//             )}
//           </button>
//         </div>
//
//         {error && (
//           <div className='flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded mb-4'>
//             <AlertCircle className='h-4 w-4' />
//             {error}
//           </div>
//         )}
//
//         {checkins.length > 0 && (
//           <div className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
//             Found {checkins.length} check-ins
//           </div>
//         )}
//       </div>
//
//       {checkins.length > 0 && (
//         <div className='mb-6'>
//           <div className='flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-6'>
//             <TabButton active={activeTab === 'summary'} onClick={() => setActiveTab('summary')}>
//               Summary
//             </TabButton>
//             <TabButton active={activeTab === 'checkins'} onClick={() => setActiveTab('checkins')}>
//               Check-ins
//             </TabButton>
//           </div>
//
//           {/* Summary tab content */}
//           <div className={activeTab === 'summary' ? 'block' : 'hidden'}>
//             <YearSummary checkins={checkins} />
//           </div>
//
//           {/* Checkins tab content */}
//           <div className={activeTab === 'checkins' ? 'block' : 'hidden'}>
//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
//               {checkins.map((checkin, index) => (
//                 <div key={index} className='relative group'>
//                   <CheckinCard checkin={checkin} />
//                   <button
//                     onClick={() => setSelectedJson(checkin)}
//                     className='absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity'
//                   >
//                     View JSON
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//
//       {checkins.length === 0 && !loading && (
//         <div className='text-center text-gray-600 dark:text-gray-400 mt-8'>No check-ins here</div>
//       )}
//
//       <JsonModal
//         isOpen={selectedJson !== null}
//         onClose={() => setSelectedJson(null)}
//         data={selectedJson}
//       />
//     </div>
//   );
// };
