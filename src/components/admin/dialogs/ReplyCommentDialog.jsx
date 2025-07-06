
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MessageSquare, Send, AlertCircle, X } from 'lucide-react';

const ReplyCommentDialog = ({ comment, onReply, onClose }) => {
  const [replyText, setReplyText] = useState(comment?.reply || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!replyText.trim()) {
      setError('Vui lòng nhập nội dung trả lời');
      return;
    }

    try {
      await onReply(comment.id, replyText);
      onClose();
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi trả lời bình luận');
    }
  };

  if (!comment) return null;

  return (
    <Dialog open={!!comment} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            Trả Lời Bình Luận
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Bình luận gốc:</h4>
            <p className="text-gray-600 mb-2">{comment.content}</p>
            <div className="text-xs text-gray-500">
              <span className="font-medium">{comment.customerName}</span> • {comment.bookTitle}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="replyText" className="flex items-center gap-2 text-sm font-medium">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                Nội Dung Trả Lời *
              </Label>
              <Textarea
                id="replyText"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Nhập nội dung trả lời..."
                className="mt-1"
                rows={4}
                required
              />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Hủy
              </Button>
              <Button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
                Gửi Trả Lời
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyCommentDialog;
