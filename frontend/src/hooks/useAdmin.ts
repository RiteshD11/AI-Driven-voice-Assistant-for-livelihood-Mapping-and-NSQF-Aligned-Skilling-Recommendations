/**
 * Kaushal Saathi - Admin Dashboard Hook
 * Aggregates high-level metrics, Recharts series, and beneficiary drilldown
 */

import { useState, useEffect, useCallback } from 'react';
import {
  AdminOverview,
  Beneficiary,
  RegionalSkillData,
  TrainingDemandData,
  SkillGapAnalytics,
  OutcomeAnalytics,
} from '../types';
import { adminService } from '../services/admin.service';

export function useAdmin() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [skillGapAnalytics, setSkillGapAnalytics] = useState<SkillGapAnalytics[]>([]);
  const [trainingDemand, setTrainingDemand] = useState<TrainingDemandData[]>([]);
  const [regionalData, setRegionalData] = useState<RegionalSkillData[]>([]);
  const [outcomeAnalytics, setOutcomeAnalytics] = useState<OutcomeAnalytics | null>(null);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [filterDistrict, setFilterDistrict] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdminData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [ovRes, sgRes, tdRes, regRes, outRes, benRes] = await Promise.all([
        adminService.getOverview(),
        adminService.getSkillGapAnalytics(),
        adminService.getTrainingDemand(),
        adminService.getRegionalData(),
        adminService.getOutcomeAnalytics(),
        adminService.getBeneficiaries(),
      ]);

      if (ovRes.data) setOverview(ovRes.data);
      if (sgRes.data) setSkillGapAnalytics(sgRes.data);
      if (tdRes.data) setTrainingDemand(tdRes.data);
      if (regRes.data) setRegionalData(regRes.data);
      if (outRes.data) setOutcomeAnalytics(outRes.data);
      if (benRes.data) setBeneficiaries(benRes.data);
    } catch (err: unknown) {
      setError('Failed to fetch real-time analytics. Showing cached government dataset.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const openBeneficiaryDetail = (ben: Beneficiary) => {
    setSelectedBeneficiary(ben);
    setIsDetailDrawerOpen(true);
  };

  const closeBeneficiaryDetail = () => {
    setIsDetailDrawerOpen(false);
  };

  const filteredBeneficiaries = beneficiaries.filter(b => {
    const matchDistrict = filterDistrict === 'all' || b.district.toLowerCase() === filterDistrict.toLowerCase();
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchDistrict && matchStatus;
  });

  return {
    overview,
    skillGapAnalytics,
    trainingDemand,
    regionalData,
    outcomeAnalytics,
    beneficiaries: filteredBeneficiaries,
    allBeneficiaries: beneficiaries,
    selectedBeneficiary,
    isDetailDrawerOpen,
    openBeneficiaryDetail,
    closeBeneficiaryDetail,
    filterDistrict,
    setFilterDistrict,
    filterStatus,
    setFilterStatus,
    loading,
    error,
    refresh: fetchAdminData,
  };
}
