
import { useQuery } from '@tanstack/react-query';
import { reportService } from '../services/reportService';

export const useReportApi = () => {
  // Query để lấy tất cả thống kê
  const {
    data: bookStatistics,
    isLoading: isLoadingBookStats,
    error: bookStatsError,
    refetch: refetchBookStats
  } = useQuery({
    queryKey: ['bookStatistics'],
    queryFn: reportService.getBookStatistics,
    staleTime: 5 * 60 * 1000, // 5 phút
    retry: 2,
    onError: (error) => {
      console.error('🔥 Book Statistics Query Error:', error);
    }
  });

  // Query riêng cho từng loại thống kê (optional - có thể dùng khi cần)
  const {
    data: overviewStats,
    isLoading: isLoadingOverview,
    error: overviewError,
    refetch: refetchOverview
  } = useQuery({
    queryKey: ['overviewStatistics'],
    queryFn: reportService.getOverviewStatistics,
    staleTime: 5 * 60 * 1000,
    enabled: false // Chỉ gọi khi cần thiết
  });

  const {
    data: dailyStats,
    isLoading: isLoadingDaily,
    error: dailyError,
    refetch: refetchDaily
  } = useQuery({
    queryKey: ['dailyStatistics'],
    queryFn: reportService.getDailyStatistics,
    staleTime: 60 * 1000, // 1 phút (cập nhật thường xuyên hơn)
    enabled: false
  });

  const {
    data: weeklyStats,
    isLoading: isLoadingWeekly,
    error: weeklyError,
    refetch: refetchWeekly
  } = useQuery({
    queryKey: ['weeklyStatistics'],
    queryFn: reportService.getWeeklyStatistics,
    staleTime: 5 * 60 * 1000,
    enabled: false
  });

  const {
    data: monthlyStats,
    isLoading: isLoadingMonthly,
    error: monthlyError,
    refetch: refetchMonthly
  } = useQuery({
    queryKey: ['monthlyStatistics'],
    queryFn: reportService.getMonthlyStatistics,
    staleTime: 10 * 60 * 1000, // 10 phút
    enabled: false
  });

  // Log để debug
  console.log('🔍 Report API Hook Status:', {
    bookStatistics,
    isLoadingBookStats,
    bookStatsError: bookStatsError?.message,
    overviewStats,
    dailyStats,
    weeklyStats,
    monthlyStats
  });

  return {
    // Dữ liệu chính (gộp tất cả)
    bookStatistics,
    isLoadingBookStats,
    bookStatsError,
    refetchBookStats,
    
    // Dữ liệu riêng lẻ
    overviewStats,
    dailyStats,
    weeklyStats,
    monthlyStats,
    
    // Loading states
    isLoadingOverview,
    isLoadingDaily,
    isLoadingWeekly,
    isLoadingMonthly,
    
    // Errors
    overviewError,
    dailyError,
    weeklyError,
    monthlyError,
    
    // Refetch functions
    refetchOverview,
    refetchDaily,
    refetchWeekly,
    refetchMonthly,
    
    // Tiện ích
    isLoadingAny: isLoadingBookStats || isLoadingOverview || isLoadingDaily || isLoadingWeekly || isLoadingMonthly,
    hasError: !!(bookStatsError || overviewError || dailyError || weeklyError || monthlyError)
  };
};
