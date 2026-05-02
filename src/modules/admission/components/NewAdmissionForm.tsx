"use client";

import React, { useState } from 'react';
import axios from '@/shared/lib/axios';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

export default function NewAdmissionForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    studentName: '',
    guardianName: '',
    class: '',
    contact: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/admissions', { 
        ...formData, 
        status: 'Pending', 
        date: new Date().toISOString() 
      });
      setFormData({ studentName: '', guardianName: '', class: '', contact: '' });
      onSuccess();
    } catch (err) {
      console.error("Error creating admission:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full bg-card p-6 rounded-lg border shadow-sm">
      <h2 className="text-lg font-semibold mb-4">New Admission Application</h2>
      <div>
        <label className="text-sm font-medium mb-1 block">Student Name</label>
        <Input 
          placeholder="e.g. John Doe" 
          value={formData.studentName} 
          onChange={(e) => setFormData({...formData, studentName: e.target.value})} 
          required 
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Guardian Name</label>
        <Input 
          placeholder="e.g. Richard Doe" 
          value={formData.guardianName} 
          onChange={(e) => setFormData({...formData, guardianName: e.target.value})} 
          required 
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Class Admission For</label>
        <Input 
          placeholder="e.g. Class 1" 
          value={formData.class} 
          onChange={(e) => setFormData({...formData, class: e.target.value})} 
          required 
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Contact Number</label>
        <Input 
          placeholder="e.g. 01700000000" 
          value={formData.contact} 
          onChange={(e) => setFormData({...formData, contact: e.target.value})} 
          required 
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full mt-2">
        {loading ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
}
