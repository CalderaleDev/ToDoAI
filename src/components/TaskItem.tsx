import * as React from "react";
import { FlexboxLayout, Button, Label } from "@nativescript/core";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string, completed: boolean) => void;
}

export function TaskItem({ task, onToggleComplete }: TaskItemProps) {
  const priorityColors = {
    low: "#4CAF50",
    medium: "#FFC107",
    high: "#F44336"
  };

  return (
    <FlexboxLayout className="p-10 border-b border-gray-200">
      <FlexboxLayout flexDirection="column" flexGrow={1}>
        <Label 
          text={task.title}
          className="text-lg font-medium"
        />
        <Label 
          text={new Date(task.dueDate).toLocaleDateString()}
          className="text-sm text-gray-600"
        />
        {task.description && (
          <Label 
            text={task.description}
            className="text-sm text-gray-500 mt-1"
          />
        )}
        <Label 
          text={`Priority: ${task.priority}`}
          style={`color: ${priorityColors[task.priority]}`}
          className="text-sm mt-1"
        />
      </FlexboxLayout>
      <Button
        text={task.completed ? "✓" : "○"}
        onTap={() => onToggleComplete(task.id, task.completed)}
        className={`btn ${task.completed ? 'btn-success' : 'btn-outline'}`}
      />
    </FlexboxLayout>
  );
}