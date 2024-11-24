import * as React from "react";
import { useState, useEffect } from "react";
import { StackNavigationProp } from "react-nativescript-navigation";
import { FlexboxLayout, TextField, ListView } from "@nativescript/core";
import { supabase } from "../config/supabase";
import { Task } from "../types";
import { TaskItem } from "../components/TaskItem";

interface TaskListScreenProps {
  navigation: StackNavigationProp<any, "TaskList">;
}

export function TaskListScreen({ navigation }: TaskListScreenProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTasks();
    const subscription = subscribeToTasks();
    return () => {
      subscription();
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('dueDate', { ascending: true });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const subscribeToTasks = () => {
    const subscription = supabase
      .channel('tasks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, 
        () => {
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const toggleTaskCompletion = async (taskId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !completed })
        .eq('id', taskId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <FlexboxLayout flexDirection="column" height="100%">
      <TextField
        hint="Search tasks..."
        text={searchQuery}
        onTextChange={(args) => setSearchQuery(args.value)}
        className="input input-rounded m-10"
      />
      <ListView
        items={filteredTasks}
        className="flex-grow"
        itemTemplate={(item: Task) => (
          <TaskItem 
            task={item} 
            onToggleComplete={toggleTaskCompletion}
          />
        )}
      />
      <Button
        text="Add Task"
        onTap={() => navigation.navigate("AddTask")}
        className="btn btn-primary m-10"
      />
    </FlexboxLayout>
  );
}