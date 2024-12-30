'use client';

import React, { useState } from 'react';
import Checkin from '@/types/Checkin';
import { useCheckins } from '@/hooks/useCheckins';
import { ErrorMessage } from '@/components/ErrorMessage';
import { TabContent } from '@/components/TabContent';
import { Header } from '@/components/Header';
import { LoginForm } from '@/components/LoginForm';
import { JsonModal } from '@/components/JsonModal';
import { useLogin } from '@/hooks/useLogin';
import { Loader2 } from 'lucide-react';
import { Config } from '@/config';

export const USC = () => {
  const [selectedJson, setSelectedJson] = useState<Checkin | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'checkins'>('summary');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {
    checkins,
    isLoading: checkinsLoading,
    error: checkinsError,
    fetchCheckins,
  } = useCheckins();
  const { login, isLoading: loginLoading, error: loginError } = useLogin();

  const handleLogin = async (credentials: { username: string; password: string }) => {
    try {
      const token = await login(credentials);
      if (token) {
        setIsAuthenticated(true);
        await fetchCheckins(token, Config.SUMMARY_YEAR);
      }
    } catch (err) {
      console.error('Login and fetch failed:', err);
    }
  };

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto p-4'>
        <div className='max-w-7xl mx-auto'>
          <Header />

          <div className='flex justify-center items-center'>
            <div className='w-full max-w-md'>
              {!isAuthenticated ? (
                <LoginForm loading={loginLoading || checkinsLoading} onSubmit={handleLogin} />
              ) : checkinsLoading ? (
                <div className='flex items-center justify-center gap-2 text-gray-600'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  <span>Loading checkins...</span>
                </div>
              ) : null}

              {(loginError || checkinsError) && (
                <ErrorMessage error={loginError || checkinsError} />
              )}
            </div>
          </div>

          {checkins.length > 0 ? (
            <TabContent
              activeTab={activeTab}
              onTabChange={setActiveTab}
              checkins={checkins}
              onJsonView={setSelectedJson}
            />
          ) : null}
        </div>
      </div>

      <JsonModal
        isOpen={selectedJson !== null}
        onClose={() => setSelectedJson(null)}
        data={selectedJson}
      />
    </div>
  );
};
