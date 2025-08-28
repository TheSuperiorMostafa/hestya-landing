import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Hestya — Community Operating System',
  description: 'The mobile-first OS for modern communities.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}