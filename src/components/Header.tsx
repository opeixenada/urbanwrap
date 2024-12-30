import { Config } from '@/config';

export const Header = ({ firstName }: { firstName?: string }) => (
  <h1 className='text-4xl font-bold mb-8 flex items-center gap-2 mt-4'>
    {firstName ? `${firstName}'s` : ''} Urban Sports Wrapped {Config.SUMMARY_YEAR}
  </h1>
);
