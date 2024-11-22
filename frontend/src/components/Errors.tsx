import React from 'react';

interface ErrorMessageProps {
  errors: string | string[] | Record<string, string[]> | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors }) => {
  if (!errors || errors.length == 0) return null;

  const renderErrors = () => {
    if (typeof errors === 'string') {
      return <li>{errors}</li>;
    } else if (Array.isArray(errors)) {
      return errors.map((error, index) => <li key={index}>{error}</li>);
    } else if (typeof errors === 'object') {
      return Object.entries(errors).map(([field, fieldErrors]) => (
        <li key={field}>
          <strong>{field}:</strong>
          <ul>
            {Array.isArray(fieldErrors) 
              ? fieldErrors.map((error, index) => <li key={index}>{error}</li>)
              : <li>{fieldErrors}</li>
            }
          </ul>
        </li>
      ));
    }
    return null;
  };

  return (

    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
      <strong className="font-bold">Error:</strong>
      <ul className="mt-2 list-disc list-inside">
        {renderErrors()}
      </ul>
    </div>
  );
};

export default ErrorMessage;