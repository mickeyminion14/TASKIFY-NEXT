import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ReactNode } from 'react';

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}): Promise<Metadata> {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: 'Board',
    };
  }
  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  return {
    title: board?.title || 'Board',
  };
}

export default async function BoardIdLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { boardId: string };
}) {
  const { orgId } = auth();

  if (!orgId) {
    redirect('/select-org');
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
}
