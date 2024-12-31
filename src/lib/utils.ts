import nlp from 'compromise';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function convertBlobUrlToFile(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || 'application/octet-stream';
  const file = new File([blob], `${fileName}.${mimeType.split('/')[1]}`, {
    type: mimeType,
  });
  return file;
}

export const extractKeywords = (sentence: string) => {
  const doc = nlp(sentence);

  // Extract only nouns
  const nouns = doc.nouns().out('array');

  // List of stop words to exclude
  const stopWords = [
    'a',
    'an',
    'the',
    'with',
    'of',
    'on',
    'in',
    'for',
    'and',
    'to',
    'by',
    'as',
  ];

  const keywords = nouns.flatMap((word: string) => {
    // Remove punctuation
    const cleanedWord = word.replace(/[^\w\s]/g, '');

    return cleanedWord
      .split(/\s+/)
      .filter((w: string) => !stopWords.includes(w.toLowerCase()));
  });

  return keywords;
};
