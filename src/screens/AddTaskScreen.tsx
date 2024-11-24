import * as React from "react";
import { useState } from "react";
import { StackNavigationProp } from "react-nativescript-navigation";
import { FlexboxLayout, TextField, DatePicker, Button, SegmentedBar, SegmentedBarItem } from "@nativescript/core";
import { supabase } from "../config/supabase";

interface AddTaskScreenProps {
  navigation: StackNavigationProp<any, "AddTask">;
}

export function AddTaskScreen({ navigation }: AddTaskScreenProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [loading, setLoading] = useState(false);

  const priorities = [
    { title: "Low" },
    { title: "Medium" },
    { title: "High" }
  ];

  const handleCreateTask = async () => {
    if (!title.trim()) {
      alert({
        title: "Error",
        message: "Please enter a task title",
        okButtonText: "OK"
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.from("tasks").insert({
        title,
        description,
        dueDate: dueDate.toISOString(),
        priority,
        completed: false,
        userId: (await supabase.auth.getUser()).data.user?.id
      });

      if (error) throw error;
      navigation.goBack();
    } catch (error) {
      console.error("Error creating task:", error.message);
      alert({
        title: "Error",
        message: "Failed to create task",
        okButtonText: "OK"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlexboxLayout flexDirection="column" padding={16}>
      <TextField
        hint="Task Title"
        text={title}
        onTextChange={(args) => setTitle(args.value)}
        className="input input-rounded m-b-10"
      />
      
      <TextField
        hint="Description"
        text={description}
        onTextChange={(args) => setDescription(args.value)}
        className="input input-rounded m-b-10"
      />
      
      <label className="text-sm text-gray-600 m-b-2">Due Date</label>
      <DatePicker
        date={dueDate}
        onDateChange={(args) => setDueDate(args.value)}
        className="m-b-10"
      />
      
      <label className="text-sm text-gray-600 m-b-2">Priority</label>
      <SegmentedBar
        items={priorities}
        selectedIndex={["low", "medium", "high"].indexOf(priority)}
        onSelectedIndexChange={(args) => {
          setPriority(["low", "medium", "high"][args.newIndex] as "low" | "medium" | "high");
        }}
        className="m-b-10"
      />
      
      <Button
        text={loading ? "Creating..." : "Create Task"}
        onTap={handleCreateTask}
        isEnabled={!loading}
        className="btn btn-primary"
      />
    </FlexboxLayout>
  );
}