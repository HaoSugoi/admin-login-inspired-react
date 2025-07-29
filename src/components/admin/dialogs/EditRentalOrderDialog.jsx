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

const EditRentalOrderDialog = ({
  isOpen,
  onClose,
  rental,
  onCompleted,
  rentalDetails,
}) => {
  const [returnDate, setReturnDate] = useState("");
  const [updatedConditions, setUpdatedConditions] = useState({});
  const [conditionDescriptions, setConditionDescriptions] = useState({});

  useEffect(() => {
    if (Array.isArray(rentalDetails)) {
      const initialConditions = {};
      const initialDescriptions = {};

      rentalDetails.forEach((item) => {
        initialConditions[item.Id] = item.Condition ?? 100;
        initialDescriptions[item.Id] = "";
      });

      setUpdatedConditions(initialConditions);
      setConditionDescriptions(initialDescriptions);
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
        conditionDescriptions, // { rentalDetailId: "mô tả" }
      };

      await rentalService.EditRentalOrderDialog(rental.OrderId, payload);
      toast.success("Đã hoàn tất đơn thuê");

      onCompleted?.();
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
            <Label className="mb-2 block">Cập Nhật Tình Trạng Sách</Label>
            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4">
              {Array.isArray(rentalDetails) &&
                rentalDetails.map((item) => (
                  <div
                    key={item.Id}
                    className="border rounded-md p-4 bg-gray-50 shadow-sm space-y-3"
                  >
                    <div className="font-semibold text-primary text-base truncate">
                       {item.BookTitle}
                    </div>
<div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        <span className="font-medium">Tình trạng ban đầu:</span>{" "}
                        {item.Condition}%
                      </p>
                      {item.StatusDescription && (
                        <p className="italic text-gray-500">
                          Mô tả: {item.StatusDescription}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Tình trạng sau khi trả (%)</Label>
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

                      <div>
                        <Label>Mô tả tình trạng</Label>
                        <Input
                          type="text"
                          placeholder="Ví dụ: bìa xước nhẹ, ố trang đầu..."
                          value={conditionDescriptions[item.Id] || ""}
                          onChange={(e) =>
                            setConditionDescriptions({
                              ...conditionDescriptions,
                              [item.Id]: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
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
