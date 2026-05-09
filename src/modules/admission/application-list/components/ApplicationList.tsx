"use client";

import React from 'react';
import { useSWR } from '@/shared/hooks/use-swr';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/card';

export default function ApplicationList() {
  const { data: applications, isLoading } = useSWR('/admissions');

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Recent Applications</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading applications...</p>
        ) : !applications || applications.length === 0 ? (
          <p className="text-sm text-muted-foreground">No applications found.</p>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {applications.map((app: any) => (
              <div key={app.id} className="p-4 border rounded-md flex justify-between items-center bg-card">
                <div>
                  <p className="font-medium">{app.studentName}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Class: {app.class} | Guardian: {app.guardianName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Contact: {app.contact}
                  </p>
                </div>
                <div className="text-xs bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full font-medium">
                  {app.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
