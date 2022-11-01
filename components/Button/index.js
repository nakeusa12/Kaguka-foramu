import React from 'react';

export default function Button({ action, children, variant, className }) {
  return (
    <button type='button' className={`${variant} ${className}`} onClick={action}>
      {children}
    </button>
  );
}