
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, ExternalLink, Eye } from 'lucide-react';

const SlidesSection = ({ 
  slides, 
  isLoading, 
  onAddSlide, 
  onEditSlide, 
  onDeleteSlide 
}) => {
  if (isLoading) {
    return (
      <div className="col-12">
        <div className="text-center py-4">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-12">
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle>Danh Sách Slide</CardTitle>
            <Button onClick={onAddSlide} className="btn-success">
              <Plus className="w-4 h-4 me-2" />
              Thêm Slide
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {slides.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">Chưa có slide nào</p>
            </div>
          ) : (
            <div className="row">
              {slides.map((slide) => (
                <div key={slide.id} className="col-md-6 col-lg-4 mb-4">
                  <Card className="h-100">
                    <div className="position-relative">
                      {slide.imageUrl ? (
                        <img 
                          src={slide.imageUrl} 
                          alt="Slide"
                          className="card-img-top"
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div 
                          className="bg-light d-flex align-items-center justify-content-center"
                          style={{ height: '200px' }}
                        >
                          <Eye className="text-muted" size={48} />
                        </div>
                      )}
                      
                      <div className="position-absolute top-0 end-0 m-2">
                        <Badge variant={slide.isActive ? "default" : "secondary"}>
                          {slide.isActive ? 'Hoạt động' : 'Không hoạt động'}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-3">
                      <div className="mb-2">
                        <small className="text-muted">ID: {slide.id}</small>
                      </div>
                      
                      {slide.linkUrl && (
                        <div className="mb-2">
                          <a 
                            href={slide.linkUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary text-decoration-none d-flex align-items-center"
                          >
                            <ExternalLink className="w-4 h-4 me-1" />
                            <small className="text-truncate">
                              {slide.linkUrl}
                            </small>
                          </a>
                        </div>
                      )}
                      
                      <div className="d-flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEditSlide(slide)}
                          className="flex-1"
                        >
                          <Edit className="w-4 h-4 me-1" />
                          Sửa
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onDeleteSlide(slide)}
                          className="flex-1"
                        >
                          <Trash2 className="w-4 h-4 me-1" />
                          Xóa
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SlidesSection;
