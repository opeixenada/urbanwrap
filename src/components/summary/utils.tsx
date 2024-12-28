import React from 'react';

/**
 * Formats an array of notable mentions into a readable string with proper grammatical formatting
 * @param mentions Array of strings to be formatted
 * @returns A React-compatible array of spans with proper comma, Oxford comma, and 'and' placement
 */
export const formatNotableMentions = (mentions: string[]): React.ReactNode[] => {
  return mentions.map((mention, index, array) => {
    if (index === array.length - 1) {
      return (
        <span key={mention}>
          and <span className='font-bold'>{mention}</span>
        </span>
      );
    }
    if (index === array.length - 2) {
      return (
        <span key={mention}>
          <span className='font-bold'>{mention}</span>
          {array.length > 2 ? ',' : ''}{' '}
        </span>
      );
    }
    return (
      <span key={mention}>
        <span className='font-bold'>{mention}</span>,{' '}
      </span>
    );
  });
};
