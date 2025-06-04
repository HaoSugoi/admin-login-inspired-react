
import React from 'react';

const AuthorStatisticsSection = ({ authors }) => {
  const totalAuthors = authors.length;
  const totalBooks = authors.reduce((sum, author) => sum + author.booksCount, 0);
  const avgBooksPerAuthor = Math.round(totalBooks / totalAuthors);

  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="section-card text-center">
            <h3 className="text-success">{totalAuthors}</h3>
            <p className="mb-0">Tổng Tác Giả</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="section-card text-center">
            <h3 className="text-primary">{totalBooks}</h3>
            <p className="mb-0">Tổng Tác Phẩm</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="section-card text-center">
            <h3 className="text-warning">{avgBooksPerAuthor}</h3>
            <p className="mb-0">TB Sách/Tác Giả</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorStatisticsSection;
