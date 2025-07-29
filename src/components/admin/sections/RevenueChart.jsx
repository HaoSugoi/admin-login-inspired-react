import React, { useState,useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ComposedChart , LineChart,
  Line,
} from "recharts";
import { Button } from "@/components/ui/button";
import apiClient from "../../../services/api";

const RevenueStatsSection = () => {
  const [type, setType] = useState("sale"); // "sale" | "rent"
  const [mode, setMode] = useState("daily"); // "daily" | "monthly" | "yearly"
  const [dateInput, setDateInput] = useState("");
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState("");
  const [labelType, setLabelType] = useState("");
  
  useEffect(() => {
    const today = new Date();
  
    if (mode === "daily") {
      const yyyyMMdd = today.toISOString().split("T")[0];
      setDateInput(yyyyMMdd);
    } else if (mode === "monthly") {
      const yyyyMM = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
      setDateInput(yyyyMM);
    } else if (mode === "yearly") {
      setDateInput(today.getFullYear().toString());
    }
  }, [mode]);
  
  // Gọi API sau khi dateInput được set xong
  useEffect(() => {
    if (dateInput) {
      handleConfirm();
    } 
  }, [dateInput]);
  
  const handleConfirm = async () => {
    if (!dateInput) {
      alert("Vui lòng nhập ngày/tháng/năm");
      return;
    }

    try {
      let basePath = `/Report/${type}`;
      let endpointSet = "";
      let endpointGet = "";
      let payload = null;
      const date = new Date(dateInput);

      if (mode === "daily") {
        endpointSet = `${basePath}/daily/set-date`;
        endpointGet = `${basePath}/daily`;
        payload = date.toISOString();
      } else if (mode === "monthly") {
        endpointSet = `${basePath}/monthly/set-date`;
        endpointGet = `${basePath}/monthly`;
        payload = {
          Month: date.getMonth() + 1,
          Year: date.getFullYear(),
        };
      } else if (mode === "yearly") {
        endpointSet = `${basePath}/yearly/set-date`;
        endpointGet = `${basePath}/yearly`;
        payload = { Year: parseInt(dateInput) };
      }

      await apiClient.post(endpointSet, payload);
      const res = await apiClient.get(endpointGet);

      if (mode === "daily") {
        const { Orders = [], TotalValueToday = 0, CreatedDate } = res.data || {};
        const chart = Orders.map((order, idx) => ({
          label: `Đơn ${idx + 1}`,
          value: order.TotalValue,
          time: new Date(order.CreatedDate).toLocaleTimeString("vi-VN"),
        }));
        setLabelType("Đơn hàng");
        setSummary(`📅 Ngày: ${new Date(CreatedDate).toLocaleDateString("vi-VN")} – 💰 Tổng: ${TotalValueToday.toLocaleString()} VND`);
        setData(chart);
      }

      else if (mode === "monthly") {
        const { DailyData = [], Month, Year, TotalInMonth = 0 } = res.data || {};
        const chart = DailyData.map((day) => ({
          label: `Ngày ${new Date(day.Date).getDate()}`,
          value: day.TotalValue,
        }));
        setLabelType("Ngày");
        setSummary(`📆 Tháng ${Month}/${Year} – 💰 Tổng: ${TotalInMonth.toLocaleString()} VND`);
        setData(chart);
      }

      else if (mode === "yearly") {
        const { MonthlyData = [], Year, TotalInYear = 0 } = res.data || {};
        const chart = MonthlyData
          .filter((m) => m && typeof m.Month === "number")
          .map((month) => ({
            label: `Tháng ${month.Month}`,
            value: month.TotalValue,
          }));
        setLabelType("Tháng");
        setSummary(`📅 Năm ${Year} – 💰 Tổng: ${TotalInYear.toLocaleString()} VND`);
        setData(chart);
      }

    } catch (err) {
      console.error(err);
      alert("Có lỗi khi lấy dữ liệu.");
    }
  };

  const renderInput = () => {
    if (mode === "daily") {
      return <input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} className="border p-2 rounded" />;
    }
    if (mode === "monthly") {
      return <input type="month" value={dateInput} onChange={(e) => setDateInput(e.target.value)} className="border p-2 rounded" />;
    }
    if (mode === "yearly") {
      return <input type="number" value={dateInput} onChange={(e) => setDateInput(e.target.value)} min="2000" max="2100" placeholder="Nhập năm" className="border p-2 rounded w-32" />;
    }
    return null;
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📊 Thống kê doanh thu {type === "sale" ? "bán sách" : "thuê sách"}</h2>

      <div className="flex flex-wrap gap-4 items-center mb-4">
        <select className="border p-2 rounded" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="sale">Bán sách</option>
          <option value="rent">Thuê sách</option>
        </select>

        <select className="border p-2 rounded" value={mode} onChange={(e) => {
          setMode(e.target.value);
          setDateInput("");
          setData([]);
          setSummary("");
        }}>
          <option value="daily">Theo ngày</option>
          <option value="monthly">Theo tháng</option>
          <option value="yearly">Theo năm</option>
        </select>

        {renderInput()}
        <Button onClick={handleConfirm}>Xác nhận</Button>
      </div>

      {data.length > 0 && (
        <>
          <p className="mb-2 font-semibold">{summary}</p>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip formatter={(value) => `${value.toLocaleString()} VND`} />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" name={`Doanh thu theo ${labelType}`} />
              <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Đường nối" />
            </ComposedChart>
          </ResponsiveContainer>

        </>
      )}
    </div>
  );
};

export default RevenueStatsSection;
