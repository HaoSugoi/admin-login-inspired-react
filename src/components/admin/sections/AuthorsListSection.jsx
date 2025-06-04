
import React from 'react';

const AuthorsListSection = ({ authors }) => {
  return (
    <div className="col-lg-8 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Danh Sách Tác Giả</span>
          <a href="#" className="view-all-link">Thêm Tác Giả ›</a>
        </div>
        
        <div className="authors-grid">
          {authors.map((author) => (
            <div key={author.id} className="author-card mb-4 p-3 border rounded">
              <div className="row">
                <div className="col-md-3 text-center">
                  <img 
                    src={author.avatar} 
                    alt={author.name}
                    className="author-avatar rounded-circle mb-2"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-9">
                  <h5 className="author-name">{author.name}</h5>
                  <p className="author-bio text-muted">{author.biography}</p>
                  <div className="author-info">
                    <small className="text-muted">
                      Năm sinh: {author.birthYear} | Quốc tịch: {author.nationality}
                    </small>
                    <br />
                    <span className="badge bg-success">{author.booksCount} tác phẩm</span>
                  </div>
                  <div className="author-actions mt-2">
                    <button className="btn btn-sm btn-outline-primary me-2">Sửa</button>
                    <button className="btn btn-sm btn-outline-danger">Xóa</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorsListSection;
