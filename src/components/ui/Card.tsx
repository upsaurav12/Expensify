import React from 'react';

interface CardProps {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  children,
  className = '',
  contentClassName = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {(title || action) && (
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            {title && (
              typeof title === 'string'
                ? <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                : title
            )}
            {subtitle && (
              typeof subtitle === 'string'
                ? <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
                : subtitle
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={`px-4 py-5 sm:p-6 ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;