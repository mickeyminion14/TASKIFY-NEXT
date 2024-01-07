import React from 'react';
import OrganizationControl from './_components/organization-control';
import { auth } from '@clerk/nextjs';
import { Metadata } from 'next';
import { startCase } from 'lodash';

export async function generateMetadata(): Promise<Metadata> {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || ''),
  };
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrganizationControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
