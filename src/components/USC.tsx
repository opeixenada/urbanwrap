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
import { APP_CONFIG } from '@/config/constants';

export const USC = () => {
  const [token, setToken] = useState('');
  const [selectedJson, setSelectedJson] = useState<Checkin | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'checkins'>('summary');
  const { checkins, loading, error, fetchCheckins } = useCheckins();

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-6'>
        <Header />
        <SearchForm
          token={token}
          loading={loading}
          onTokenChange={setToken}
          onSubmit={() => fetchCheckins(token, APP_CONFIG.summaryYear)}
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
