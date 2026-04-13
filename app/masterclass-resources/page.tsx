import React from 'react';
import { Metadata } from 'next';
import ResourcesClient from './ResourcesClient';

export const metadata: Metadata = {
  title: 'Masterclass Resources | instudia',
  description: 'Exclusive resources and handouts for masterclass attendees.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MasterclassResources() {
  return <ResourcesClient />;
}
