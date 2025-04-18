'use client';

import { useParams } from 'next/navigation';
import { AnalysisClient } from './client';

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  return <AnalysisClient id={id} />;
}
