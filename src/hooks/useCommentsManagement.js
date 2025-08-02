import { useEffect, useState } from "react";
import commentServiceAdmin from "../services/commentService";
import { salebooksService } from "../services/SaleBooksService";
import { rentBookItemService } from "../services/RentBookItemService";
import { userService } from "../services/customerService";

export const useCommentsManagement = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const rawComments = await commentServiceAdmin.getAllComments();

      const [saleBooks, rentBooks, users] = await Promise.all([
        salebooksService.getAllSaleBookss(),
        rentBookItemService.getAll(),
        userService.getUsers(),
      ]);

      const mapped = rawComments.map((comment) => {
        const saleBook = saleBooks.find((b) => b.SaleBookId === comment.bookId);
        const rentBook = rentBooks.find((b) => b.RentBookId === comment.bookId);

        const user = users.find((u) => u.Id === comment.customerId);
        const isAdmin = comment.customerId === "admin-id-123";

        return {
          ...comment,
          bookTitle: saleBook?.Title || rentBook?.Title || "Không xác định",
          customerName: isAdmin
            ? "Chủ shop"
            : user?.UserName || "Chủ Shop",
        };
      });

      setComments(mapped);
    } catch (err) {
      console.error("❌ Lỗi khi fetch comments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return {
    comments,
    loading,
    fetchComments,
  };
};