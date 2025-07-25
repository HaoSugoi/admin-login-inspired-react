import React from 'react';

const Logo = () => {
  return (
    <div className="text-center mb-4">
      <div className="d-inline-flex align-items-center justify-content-center mb-3">
        {/* Sử dụng thẻ img để hiển thị logo từ đường dẫn */}
        <img 
          src="\Untitled_design-removebg-preview.png" 
          alt="Có & Lá Logo"
          style={{
            width: '140px', // Giữ nguyên kích thước như logo cũ
            height: 'auto', // Giữ tỷ lệ
            objectFit: 'contain'
          }}
        />
      </div>
      
    </div>
  );
};

export default Logo;