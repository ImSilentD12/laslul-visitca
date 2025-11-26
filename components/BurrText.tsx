import React from 'react';
import { ViewMode } from '../types';

interface BurrTextProps {
  text: string;
  mode: ViewMode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const burrify = (text: string): string => {
  return text
    // English lisp (W)
    .replace(/r/g, 'w')
    .replace(/R/g, 'W')
    .replace(/Wr/g, 'W')
    .replace(/rr/g, 'ww')
    // Russian lisp (L - classic kartavy style)
    .replace(/р/g, 'л')
    .replace(/Р/g, 'Л');
};

export const BurrText: React.FC<BurrTextProps> = ({ text, mode, className = '', as: Component = 'span' }) => {
  const content = mode === ViewMode.BURR ? burrify(text) : text;
  
  return (
    <Component className={className}>
      {content}
    </Component>
  );
};