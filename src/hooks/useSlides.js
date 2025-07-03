
import { useState, useEffect } from 'react';
import { userSlideService } from '../services/userSlideService';

export const useSlides = () => {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSlides = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await userSlideService.getActiveSlides();
      if (response.isSuccess) {
        // Chỉ lấy các slide có ImageUrl
        const activeSlides = (response.data || []).filter(slide => 
          slide.imageUrl && slide.imageUrl.trim() !== ''
        );
        setSlides(activeSlides);
      } else {
        setError('Không thể tải slide');
      }
    } catch (error) {
      console.error('Error loading slides:', error);
      setError('Lỗi khi tải slide');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSlides();
  }, []);

  return { slides, isLoading, error, loadSlides };
};
