
// import React from 'react';
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
// import { useSlides } from '../hooks/useSlides';
// import { ExternalLink } from 'lucide-react';

// const SlideBanner = () => {
//   const { slides, isLoading, error } = useSlides();

//   const handleSlideClick = (linkUrl) => {
//     if (linkUrl && linkUrl.trim() !== '') {
//       // Kiểm tra nếu là link nội bộ hoặc external
//       if (linkUrl.startsWith('http://localhost') || linkUrl.startsWith('/')) {
//         // Link nội bộ - sử dụng window.location
//         window.location.href = linkUrl;
//       } else {
//         // Link external - mở tab mới
//         window.open(linkUrl, '_blank', 'noopener,noreferrer');
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
//         <div className="text-gray-500">Đang tải banner...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full h-64 bg-red-50 rounded-lg flex items-center justify-center">
//         <div className="text-red-500">{error}</div>
//       </div>
//     );
//   }

//   if (!slides || slides.length === 0) {
//     return (
//       <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
//         <div className="text-gray-500">Không có banner để hiển thị</div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-6xl mx-auto mb-8">
//       <Carousel 
//         className="w-full"
//         opts={{
//           align: "start",
//           loop: true,
//         }}
//       >
//         <CarouselContent>
//           {slides.map((slide) => (
//             <CarouselItem key={slide.slideId}>
//               <div className="relative group">
//                 <div
//                   className={`relative overflow-hidden rounded-lg ${
//                     slide.linkUrl ? 'cursor-pointer' : ''
//                   }`}
//                   onClick={() => handleSlideClick(slide.linkUrl)}
//                 >
//                   <img
//                     src={slide.imageUrl}
//                     alt="Banner"
//                     className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
//                   />
                  
//                   {slide.linkUrl && (
//                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
//                       <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         <div className="bg-white bg-opacity-90 rounded-full p-3">
//                           <ExternalLink className="w-6 h-6 text-gray-700" />
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
        
//         {slides.length > 1 && (
//           <>
//             <CarouselPrevious className="left-4" />
//             <CarouselNext className="right-4" />
//           </>
//         )}
//       </Carousel>
//     </div>
//   );
// };

// export default SlideBanner;
