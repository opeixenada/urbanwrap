'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import JsonModal from '@/components/JsonModal';
import CheckinCard from '@/components/CheckinCard';

const USCCheckins = () => {
  const [token, setToken] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedJson, setSelectedJson] = useState(null);

  const fetchCheckins = async () => {
    setLoading(true);
    setError('');

    try {
      let allRecords = [];
      let page = 1;
      const pageSize = 10;

      while (true) {
        const response = await fetch('/api/usc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            page,
            pageSize,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success || !data.data) {
          break;
        }

        const processedRecords = data.data
          .filter((item) => item.course)
          .filter((item) => new Date(item.created).getFullYear() === parseInt(year));

        allRecords = [...allRecords, ...processedRecords];

        if (data.data.length < pageSize) {
          break;
        }

        page++;
      }

      // Sort by date descending
      allRecords.sort((a, b) => new Date(b.created) - new Date(a.created));
      setCheckins(allRecords);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold mb-6'>Urban Sports Club Checkins</h1>

        <div className='flex gap-4 mb-6'>
          <input
            type='password'
            placeholder='Enter your USC token'
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='number'
            placeholder='Year'
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className='w-24 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={fetchCheckins}
            disabled={!token || !year || loading}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center'
          >
            {loading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Loading
              </>
            ) : (
              'Fetch Checkins'
            )}
          </button>
        </div>

        {error && <div className='text-red-500 mb-4'>Error: {error}</div>}

        {checkins.length > 0 && (
          <div className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
            Found {checkins.length} check-ins for {year}
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {checkins.map((checkin, index) => (
          <div key={index} className='relative group'>
            <CheckinCard checkin={checkin} />
            <button
              onClick={() => setSelectedJson(checkin)}
              className='absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity'
            >
              View JSON
            </button>
          </div>
        ))}
      </div>

      <JsonModal
        isOpen={selectedJson !== null}
        onClose={() => setSelectedJson(null)}
        data={selectedJson}
      />
    </div>
  );
};

export default USCCheckins;
