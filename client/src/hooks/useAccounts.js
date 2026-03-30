import { useState, useEffect } from 'react';
import { accountService } from '../services/api';

export const useAccounts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const res = await accountService.getStats();
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch {
        // Fallback mock data
        setData({
          totalCollection: '₹4.8L',
          thisMonthSpend: '₹2.4L',
          status: '98% Paid',
          growth: '+12.5%',
          expenses: [
            { category: 'Security & Staff', amount: '₹85,000', share: '35%', color: 'bg-blue-500' },
            { category: 'Electricity & Water', amount: '₹65,000', share: '27%', color: 'bg-indigo-500' },
            { category: 'Waste Management', amount: '₹30,000', share: '12%', color: 'bg-emerald-500' },
            { category: 'Repairs & Maint.', amount: '₹60,000', share: '26%', color: 'bg-rose-500' },
          ],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  return { data, loading, error };
};
