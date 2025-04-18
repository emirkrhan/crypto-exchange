"use client";

import { trades } from "@/constants/cryptoCategory";



const RecentTrades = () => {
  return (
    <div className="p-4">
      <h5 className="mb-3 fs-2">Recent trades</h5>
      <table className="table table-sm table-borderless fs-4">
        <thead>
          <tr className="text-muted small">
            <th className="fs-18 fw-bold text-center">Time</th>
            <th className="fs-18 fw-bold text-center">Price(BTC)</th>
            <th className="fs-18 fw-bold text-center">Amount (ETH)</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => {
            const prevPrice = trades[index - 1]?.price;
            const priceChange =
              prevPrice !== undefined && trade.price > prevPrice
                ? "text-success"
                : prevPrice !== undefined && trade.price < prevPrice
                ? "text-danger"
                : "";

            return (
              <tr
                key={index}
                className="align-middle"
              >
                <td className="text-center fs-4 td-height">{trade.time}</td>
                <td className={`fw-bold text-center fs-4 td-height ${priceChange}`}>
                  {trade.price.toFixed(6)}
                </td>
                <td className="text-center fs-4 td-height">{trade.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTrades;
