import React from 'react';

interface PhaseTimerProps {
  phaseName: string;
}

export default function PhaseTimer({ phaseName }: PhaseTimerProps) {
  return (
    <div className="border rounded p-4 mb-2">
      <h2 className="text-xl font-semibold">{phaseName}</h2>
      <p>Timer placeholder.</p>
    </div>
  );
}
