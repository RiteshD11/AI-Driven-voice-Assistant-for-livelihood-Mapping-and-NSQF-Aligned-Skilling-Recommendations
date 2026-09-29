/**
 * Kaushal Saathi - Beneficiary Hook
 * Provides profile details, current livelihood, education, mobility, and state updates.
 */

import { useState, useEffect, useCallback } from 'react';
import { Beneficiary, LivelihoodProfile } from '../types';
import { beneficiaryService } from '../services/beneficiary.service';
import { profileService } from '../services/profile.service';

export function useBeneficiary(beneficiaryId: string = 'ben-sc-2026-001') {
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);
  const [profile, setProfile] = useState<LivelihoodProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [benRes, profRes] = await Promise.all([
        beneficiaryService.getProfile(beneficiaryId),
        profileService.getProfileByBeneficiary(beneficiaryId),
      ]);

      if (benRes.data) setBeneficiary(benRes.data);
      if (profRes.data) setProfile(profRes.data);
    } catch (err: unknown) {
      setError('Unable to load beneficiary profile. Showing local cached profile.');
    } finally {
      setLoading(false);
    }
  }, [beneficiaryId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateProfile = async (updates: Partial<LivelihoodProfile>) => {
    try {
      const res = await profileService.updateProfile(beneficiaryId, updates);
      if (res.data) setProfile(res.data);
      return res;
    } catch (err: unknown) {
      throw new Error('Update failed');
    }
  };

  return {
    beneficiary,
    profile,
    loading,
    error,
    refresh: loadData,
    updateProfile,
  };
}
