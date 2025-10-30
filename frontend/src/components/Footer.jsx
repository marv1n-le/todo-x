import React from "react";

const Footer = ({ completedTasksCount, activeTasksCount }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                🎉 Tuyệt vời! Bạn đã hoàn thành {completedTasksCount} nhiệm vụ
                {activeTasksCount > 0 &&
                  `, còn lại ${activeTasksCount} nhiệm vụ đang chờ bạn hoàn thành.`}
              </>
            )}

            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>🚀 Tiếp tục phát huy! Bạn còn {activeTasksCount} nhiệm vụ đang chờ.</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
