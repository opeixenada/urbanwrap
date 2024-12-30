'use client';

import React, { useState } from 'react';
import { PrivacyModal } from '@/components/footer/PrivacyModal';
import { ContactModal } from '@/components/footer/ContactModal';

export function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className='w-full py-4'>
        <div className='container mx-auto px-4 flex justify-between items-center'>
          <div className='flex gap-6'>
            <button
              onClick={() => setShowContact(true)}
              className='text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors'
            >
              Contact
            </button>
            <button
              onClick={() => setShowPrivacy(true)}
              className='text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors'
            >
              Privacy & Cookies
            </button>
          </div>
          <p className='text-sm text-gray-600 dark:text-gray-400'>{currentYear} UrbanWrap</p>
        </div>
      </footer>
      <PrivacyModal open={showPrivacy} onOpenChange={setShowPrivacy} />
      <ContactModal open={showContact} onOpenChange={setShowContact} />
    </>
  );
}