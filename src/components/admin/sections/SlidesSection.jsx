import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, ExternalLink, Eye } from 'lucide-react';
import { slideService } from '@/services/slideService';

const SlidesSection = () => {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [linkUrl, setLinkUrl] = useState('');

  const fetchSlides = async () => {
    try {
      setIsLoading(true);
      const data = await slideService.getAllSlides();
      setSlides(data);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách slides:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleAddSlide = async () => {
    try {
      if (!selectedFile || !linkUrl) {
        return alert('Vui lòng chọn ảnh và nhập LinkUrl');
      }
      await slideService.createSlide({ imageFile: selectedFile, linkUrl });
      setLinkUrl('');
      setSelectedFile(null);
      await fetchSlides();
    } catch (error) {
      console.error('Lỗi khi thêm slide:', error);
    }
  };

  const handleDeleteSlide = async (slide) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa slide này?')) return;
    try {
      await slideService.deleteSlide(slide.SlideId);
      await fetchSlides();
    } catch (error) {
      console.error('Lỗi khi xóa slide:', error);
    }
  };

  return (
    <div className="col-12">
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle>Danh Sách Slide</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {/* Form thêm slide */}
          <div className="mb-4">
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="form-control mb-2"
            />
            <input
              type="text"
              placeholder="Nhập LinkUrl"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="form-control mb-2"
            />
            <Button onClick={handleAddSlide} className="btn-success">
              <Plus className="w-4 h-4 me-2" />
              Thêm Slide
            </Button>
          </div>

          {/* Danh sách slide */}
          {isLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Đang tải...</span>
              </div>
            </div>
          ) : slides.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">Chưa có slide nào</p>
            </div>
) : (
            <div className="row">
              {slides.map((slide) => (
                <div key={slide.SlideId} className="col-md-6 col-lg-4 mb-4">
                  <Card className="h-100">
                    <div className="position-relative">
                      {slide.ImageUrl ? (
                        <img
                          src={`https://chosachonline-datn.onrender.com${slide.ImageUrl}`}
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
                        <Badge variant="default">Slide</Badge>
                      </div>
                    </div>

                    <CardContent className="p-3">
                      <div className="mb-2">
                        <small className="text-muted">link: {slide.LinkUrl}</small>
                      </div>

                      {slide.LinkUrl && (
                        <div className="mb-2">
                          <a
                            href={slide.LinkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-decoration-none d-flex align-items-center"
                          >
                            <ExternalLink className="w-4 h-4 me-1" />
                            <small className="text-truncate">{slide.LinkUrl}</small>
                          </a>
                        </div>
                      )}

                      <div className="d-flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteSlide(slide)}
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