import Link from 'next/link';

export default function Privacy() {
  return (
    <div className='flex-1'>
      <main className='container mx-auto px-4 py-12'>
        <h1 className='text-2xl font-bold mb-6 dark:text-white'>Privacy & Cookies</h1>
        <p className='text-gray-700 dark:text-gray-300 mb-8'>
          We don&#39;t collect any information, we don&#39;t use cookies, and we completely forget
          about you after you close or refresh the page. Peace!
        </p>
        <p className='mt-12'>
          <Link
            href='/'
            className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          >
            &gt;&gt; Go back
          </Link>
        </p>
      </main>
    </div>
  );
}
