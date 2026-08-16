import React from 'react';
import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import ResourcesClient from './ResourcesClient';

export const metadata: Metadata = {
  title: 'Web Dev Masterclass Resources',
  description: 'Exclusive resources and handouts for masterclass attendees.',
  robots: {
    index: false,
    follow: false,
  },
  metadataBase: new URL(SITE_URL),
};

export default function MasterclassResources() {
  return <ResourcesClient />;
}
