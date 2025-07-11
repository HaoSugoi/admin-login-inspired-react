import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { rentalService } from "@/services/rentalService";

const EditRentalOrderDialog = ({ isOpen, onClose, rental, onCompleted ,rentalDetails, }) => {
  const [returnDate, setReturnDate] = useState("");
  const [updatedConditions, setUpdatedConditions] = useState({});

 useEffect(() => {
  if (Array.isArray(rentalDetails)) {
    const initial = {};
    rentalDetails.forEach((item) => {
      initial[item.Id] = item.Condition ?? 100;
    });
    setUpdatedConditions(initial);
  }

  setReturnDate(new Date().toISOString().split("T")[0]);
}, [rentalDetails]);

  const handleComplete = async () => {
  if (!rental?.OrderId) {
    toast.error("Không có ID đơn thuê");
    return;
  }

  try {
    const payload = {
      actualReturnDate: new Date(returnDate).toISOString(),
      updatedConditions, // { rentalDetailId: newCondition }
    };

    await rentalService.EditRentalOrderDialog(rental.OrderId, payload);
      toast.success("Đã hoàn tất đơn thuê");

    // ✅ Gọi callback để cập nhật giao diện
    onCompleted?.();

    // ✅ Đóng dialog
    onClose();
  } catch (err) {
    console.error(err);
    toast.error("Lỗi khi hoàn tất đơn thuê");
  }
};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Hoàn Tất Đơn Thuê</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="returnDate">Ngày Trả Thực Tế</Label>
            <Input
              id="returnDate"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          <div>
            <Label>Cập Nhật Tình Trạng Sách</Label>
            {Array.isArray(rentalDetails) && rentalDetails.map((item) => (

  <div key={item.Id} className="border rounded p-2 mb-2">
    <p className="font-medium">{item.Id}</p>
    <p className="text-sm text-muted-foreground">
      Tình trạng ban đầu: {item.Condition}%
    </p>
    <Input
      type="number"
      min={0}
      max={100}
      value={updatedConditions[item.Id] || ""}
      onChange={(e) =>
        setUpdatedConditions({
          ...updatedConditions,
          [item.Id]: parseInt(e.target.value) || 0,
        })
      }
    />
  </div>
))}

          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button onClick={handleComplete}>Hoàn tất đơn</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRentalOrderDialog;
