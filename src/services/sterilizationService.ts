// This file will handle sterilization-related backend operations.
// For now, we scaffold the file. No logic yet.

import { supabase } from './supabaseClient';

export interface SterilizationCycle {
  id: string;
  batchId: string;
  phase: string;
  startTime: string;
  endTime: string;
}

export class SterilizationService {
  // Service methods will be added as we build.
} 