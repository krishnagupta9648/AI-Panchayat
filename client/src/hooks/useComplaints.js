import { useState, useEffect } from 'react';
import { complaintService } from '../services/api';

export const useComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComplaints = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await complaintService.getAll();
      if (res.data.success) {
        setComplaints(res.data.data);
      }
    } catch {
      // Fallback to mock data if server is not running
      setComplaints([
        { _id: '1', title: 'Lift #2 not working in Block-C', status: 'Pending', vendor: 'Otis Services', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { _id: '2', title: 'Water leakage in lobby bathroom', status: 'Pending', vendor: 'Ramesh Plumber', createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) },
        { _id: '3', title: 'Common area lights flickering', status: 'Done', vendor: 'Electric Express', createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        { _id: '4', title: 'Main gate motor replacement', status: 'Done', vendor: 'GateKeeper Inc', createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const addComplaint = async (complaint) => {
    try {
      const res = await complaintService.create(complaint);
      if (res.data.success) {
        setComplaints(prev => [res.data.data, ...prev]);
        return res.data.data;
      }
    } catch {
      // Fallback: add locally with mock id
      const mock = { _id: Date.now().toString(), ...complaint, createdAt: new Date() };
      setComplaints(prev => [mock, ...prev]);
      return mock;
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return { complaints, loading, error, refetch: fetchComplaints, addComplaint };
};
