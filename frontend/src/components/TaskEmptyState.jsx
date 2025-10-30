import React from 'react'
import { Card } from './ui/card';
import { Circle } from 'lucide-react';

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-lg">
      <div className="space-y-3">
        <Circle className="mx-auto size-12 text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "Không có nhiệm vụ nào đang làm!"
              : filter === "completed"
              ? "Chưa có công việc đã hoàn thành nào!"
              : "Chưa có công việc nào được thêm vào!"}

            <p className="text-sm text-muted-foreground">
              {filter === "all"
                ? "Hãy thêm công việc mới để bắt đầu quản lý công việc của bạn."
                : `Chuyển sang "tất cả" để thấy những nhiệm vụ ${filter === "active" ? "đang làm" : "đã hoàn thành"} của bạn.
      `}
            </p>
          </h3>
        </div>
      </div>
    </Card>
  );
}

export default TaskEmptyState
