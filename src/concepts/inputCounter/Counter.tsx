import React, { useState } from 'react';
import type { ChangeEvent } from 'react';

const CharLimitInput: React.FC = () => {
  const [text, setText] = useState<string>('');
  const maxChars = 100;
  const minChars = 20;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;

    if (inputText.length <= maxChars) {
      setText(inputText);
    }
  };

  const charCount = text.length;
  const charsLeft = maxChars - charCount;

  return (
    <div className="max-w-xl mx-auto p-6 border shadow-md mt-10 rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">What is the feature of the product?</h2>
      <textarea
        className={`w-full p-3 border rounded-lg h-40 resize-none ${
          charCount > maxChars ? 'border-red-500' : ''
        }`}
        placeholder="Start typing..."
        value={text}
        onChange={handleChange}
      />
      <div className="mt-2 text-sm flex justify-between items-center">
        <span className={`${charCount < minChars ? 'text-red-600' : 'text-gray-600'}`}>
          {charCount < minChars
            ? `Minimum ${minChars} characters required`
            : `${charCount} character${charCount !== 1 ? 's' : ''}`}
        </span>
        <span className={`${charCount > maxChars ? 'text-red-600' : 'text-gray-500'}`}>
          {charCount > maxChars
            ? 'Character limit exceeded'
            : `${charsLeft} characters left`}
        </span>
      </div>
    </div>
  );
};

export default CharLimitInput;
