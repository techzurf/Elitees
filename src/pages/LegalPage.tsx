import React from 'react';

interface LegalPageProps {
  title: string;
  content: React.ReactNode;
}

export const LegalPage: React.FC<LegalPageProps> = ({ title, content }) => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">{title}</h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 prose prose-blue max-w-none text-gray-600">
          {content}
        </div>
      </div>
    </div>
  );
};
