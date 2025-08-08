'use client'; // <-- This is essential

import { useGetDashboardDataQuery } from '@/lib/features/dashboard/dashboard.api';
import React from 'react';

export default function Dashboard() {
  const { data, error, isLoading } = useGetDashboardDataQuery();
  
  return (
    <div>Dashboard</div>
  )
}
