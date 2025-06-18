
import React from 'react';

const Logo = () => {
  return (
    <div className="text-center mb-4">
      <div className="d-inline-flex align-items-center justify-content-center mb-3">
        <div className="position-relative">
          {/* Book base */}
          <div className="rounded position-relative" 
               style={{ 
                 width: '64px', 
                 height: '48px', 
                 backgroundColor: '#bbf7d0' 
               }}>
            <div className="position-absolute rounded" 
                 style={{ 
                   top: '4px', 
                   left: '4px', 
                   right: '4px', 
                   bottom: '4px', 
                   backgroundColor: 'white' 
                 }}></div>
            <div className="position-absolute d-flex flex-column" 
                 style={{ 
                   left: '8px', 
                   top: '8px', 
                   right: '8px', 
                   gap: '4px' 
                 }}>
              <div className="rounded" style={{ height: '2px', backgroundColor: '#86efac' }}></div>
              <div className="rounded" style={{ height: '2px', backgroundColor: '#86efac' }}></div>
              <div className="rounded" style={{ height: '2px', backgroundColor: '#86efac' }}></div>
            </div>
          </div>
          
          {/* Leaves */}
          <div className="position-absolute" 
               style={{ 
                 top: '-16px', 
                 left: '50%', 
                 transform: 'translateX(-50%)' 
               }}>
            <div className="position-relative">
              {/* Center stem */}
              <div className="mx-auto" 
                   style={{ 
                     width: '2px', 
                     height: '24px', 
                     backgroundColor: '#059669' 
                   }}></div>
              
              {/* Leaves arranged in a fan pattern */}
              <div className="position-absolute" 
                   style={{ 
                     top: '0', 
                     left: '50%', 
                     transform: 'translateX(-50%)' 
                   }}>
                {/* Top leaf */}
                <div className="position-absolute rounded-pill" 
                     style={{ 
                       width: '12px', 
                       height: '24px', 
                       backgroundColor: '#10b981', 
                       transform: 'rotate(-12deg)', 
                       left: '-4px', 
                       top: '-4px' 
                     }}></div>
                {/* Left leaves */}
                <div className="position-absolute rounded-pill" 
                     style={{ 
                       width: '12px', 
                       height: '24px', 
                       backgroundColor: '#10b981', 
                       transform: 'rotate(-45deg)', 
                       left: '-8px', 
                       top: '4px' 
                     }}></div>
                <div className="position-absolute rounded-pill" 
                     style={{ 
                       width: '12px', 
                       height: '24px', 
                       backgroundColor: '#10b981', 
                       transform: 'rotate(-75deg)', 
                       left: '-8px', 
                       top: '12px' 
                     }}></div>
                {/* Right leaves */}
                <div className="position-absolute rounded-pill" 
                     style={{ 
                       width: '12px', 
                       height: '24px', 
                       backgroundColor: '#10b981', 
                       transform: 'rotate(12deg)', 
                       left: '4px', 
                       top: '-4px' 
                     }}></div>
                <div className="position-absolute rounded-pill" 
                     style={{ 
                       width: '12px', 
                       height: '24px', 
                       backgroundColor: '#10b981', 
                       transform: 'rotate(45deg)', 
                       left: '8px', 
                       top: '4px' 
                     }}></div>
                <div className="position-absolute rounded-pill" 
                     style={{ 
                       width: '12px', 
                       height: '24px', 
                       backgroundColor: '#10b981', 
                       transform: 'rotate(75deg)', 
                       left: '8px', 
                       top: '12px' 
                     }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-success fs-5 fw-semibold">Có & Lá</h2>
    </div>
  );
};

export default Logo;
