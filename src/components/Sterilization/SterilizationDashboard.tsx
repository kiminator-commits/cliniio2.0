import React from 'react';
import PhaseTimer from './PhaseTimer';

export default function SterilizationDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sterilization Management</h1>
      <PhaseTimer phaseName="Bath 1" />
      <PhaseTimer phaseName="Bath 2" />
      <PhaseTimer phaseName="Drying" />
      <PhaseTimer phaseName="Autoclave" />
    </div>
  );
} 