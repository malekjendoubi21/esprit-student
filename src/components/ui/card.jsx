import React from 'react';

export function Card({ className = '', ...props }) {
  return (
    <div
      className={`rounded-lg bg-white text-gray-900 shadow-sm ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = '', ...props }) {
  return (
    <div className={`flex flex-col space-y-1.5 p-4 ${className}`} {...props} />
  );
}

export function CardTitle({ className = '', ...props }) {
  return (
    <h3
      className={`text-xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  );
}

export function CardDescription({ className = '', ...props }) {
  return (
    <p className={`text-sm text-gray-600 ${className}`} {...props} />
  );
}

export function CardContent({ className = '', ...props }) {
  return <div className={`p-4 pt-0 ${className}`} {...props} />;
}

export function CardFooter({ className = '', ...props }) {
  return (
    <div className={`flex items-center p-4 pt-0 ${className}`} {...props} />
  );
}
