
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportService } from '../services/reportService';

export const useReportApi = () => {
  const queryClient = useQueryClient();

  // ===== 1. Overview Statistics =====
  const {
    data: overviewStats,
    isLoading: isLoadingOverview,
    error: overviewError,
    refetch: refetchOverview
  } = useQuery({
    queryKey: ['overviewStatistics'],
    queryFn: reportService.getOverviewStatistics,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  // ===== 2. Sale Statistics =====
  const {
    data: dailySaleStats,
    isLoading: isLoadingDailySale,
    error: dailySaleError,
    refetch: refetchDailySale
  } = useQuery({
    queryKey: ['dailySaleStatistics'],
    queryFn: reportService.getDailySaleStatistics,
    staleTime: 60 * 1000, // 1 minute
    retry: 2
  });

  const {
    data: monthlySaleStats,
    isLoading: isLoadingMonthlySale,
    error: monthlySaleError,
    refetch: refetchMonthlySale
  } = useQuery({
    queryKey: ['monthlySaleStatistics'],
    queryFn: reportService.getMonthlySaleStatistics,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  const {
    data: yearlySaleStats,
    isLoading: isLoadingYearlySale,
    error: yearlySaleError,
    refetch: refetchYearlySale
  } = useQuery({
    queryKey: ['yearlySaleStatistics'],
    queryFn: reportService.getYearlySaleStatistics,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2
  });

  // ===== 3. Rent Statistics =====
  const {
    data: dailyRentStats,
    isLoading: isLoadingDailyRent,
    error: dailyRentError,
    refetch: refetchDailyRent
  } = useQuery({
    queryKey: ['dailyRentStatistics'],
    queryFn: reportService.getDailyRentStatistics,
    staleTime: 60 * 1000, // 1 minute
    retry: 2
  });

  const {
    data: monthlyRentStats,
    isLoading: isLoadingMonthlyRent,
    error: monthlyRentError,
    refetch: refetchMonthlyRent
  } = useQuery({
    queryKey: ['monthlyRentStatistics'],
    queryFn: reportService.getMonthlyRentStatistics,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  const {
    data: yearlyRentStats,
    isLoading: isLoadingYearlyRent,
    error: yearlyRentError,
    refetch: refetchYearlyRent
  } = useQuery({
    queryKey: ['yearlyRentStatistics'],
    queryFn: reportService.getYearlyRentStatistics,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2
  });

  // ===== 4. Mutations để set date =====
  const setDailySaleDateMutation = useMutation({
    mutationFn: reportService.setDailySaleDate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailySaleStatistics'] });
    }
  });

  const setMonthlySaleDateMutation = useMutation({
    mutationFn: ({ year, month }) => reportService.setMonthlySaleDate(year, month),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monthlySaleStatistics'] });
    }
  });

  const setYearlySaleDateMutation = useMutation({
    mutationFn: reportService.setYearlySaleDate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['yearlySaleStatistics'] });
    }
  });

  const setDailyRentDateMutation = useMutation({
    mutationFn: reportService.setDailyRentDate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyRentStatistics'] });
    }
  });

  const setMonthlyRentDateMutation = useMutation({
    mutationFn: ({ year, month }) => reportService.setMonthlyRentDate(year, month),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monthlyRentStatistics'] });
    }
  });

  const setYearlyRentDateMutation = useMutation({
    mutationFn: reportService.setYearlyRentDate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['yearlyRentStatistics'] });
    }
  });

  // ===== 5. Helper functions =====
  const refetchAllStats = () => {
    refetchOverview();
    refetchDailySale();
    refetchMonthlySale();
    refetchYearlySale();
    refetchDailyRent();
    refetchMonthlyRent();
    refetchYearlyRent();
  };

  const isLoadingAny = isLoadingOverview || isLoadingDailySale || isLoadingMonthlySale || 
                      isLoadingYearlySale || isLoadingDailyRent || isLoadingMonthlyRent || 
                      isLoadingYearlyRent;

  const hasError = !!(overviewError || dailySaleError || monthlySaleError || yearlySaleError ||
                     dailyRentError || monthlyRentError || yearlyRentError);

  // Debug log
  console.log('🔍 Report API Hook Status:', {
    overviewStats,
    dailySaleStats,
    monthlySaleStats,
    yearlySaleStats,
    dailyRentStats,
    monthlyRentStats,
    yearlyRentStats,
    isLoadingAny,
    hasError
  });

  return {
    // Data
    overviewStats,
    dailySaleStats,
    monthlySaleStats,
    yearlySaleStats,
    dailyRentStats,
    monthlyRentStats,
    yearlyRentStats,
    
    // Loading states
    isLoadingOverview,
    isLoadingDailySale,
    isLoadingMonthlySale,
    isLoadingYearlySale,
    isLoadingDailyRent,
    isLoadingMonthlyRent,
    isLoadingYearlyRent,
    isLoadingAny,
    
    // Errors
    overviewError,
    dailySaleError,
    monthlySaleError,
    yearlySaleError,
    dailyRentError,
    monthlyRentError,
    yearlyRentError,
    hasError,
    
    // Refetch functions
    refetchOverview,
    refetchDailySale,
    refetchMonthlySale,
    refetchYearlySale,
    refetchDailyRent,
    refetchMonthlyRent,
    refetchYearlyRent,
    refetchAllStats,
    
    // Mutations để set date
    setDailySaleDate: setDailySaleDateMutation.mutate,
    setMonthlySaleDate: setMonthlySaleDateMutation.mutate,
    setYearlySaleDate: setYearlySaleDateMutation.mutate,
    setDailyRentDate: setDailyRentDateMutation.mutate,
    setMonthlyRentDate: setMonthlyRentDateMutation.mutate,
    setYearlyRentDate: setYearlyRentDateMutation.mutate,
    
    // Mutation states
    isSettingDate: setDailySaleDateMutation.isPending || setMonthlySaleDateMutation.isPending ||
                   setYearlySaleDateMutation.isPending || setDailyRentDateMutation.isPending ||
                   setMonthlyRentDateMutation.isPending || setYearlyRentDateMutation.isPending
  };
};
