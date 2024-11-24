import * as React from "react";
import { BaseNavigationContainer } from '@react-navigation/core';
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { AuthScreen } from "../screens/AuthScreen";
import { TaskListScreen } from "../screens/TaskListScreen";
import { AddTaskScreen } from "../screens/AddTaskScreen";

const StackNavigator = stackNavigatorFactory();

export function AppNavigator() {
  return (
    <BaseNavigationContainer>
      <StackNavigator.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerShown: true,
        }}
      >
        <StackNavigator.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <StackNavigator.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{ title: "My Tasks" }}
        />
        <StackNavigator.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{ title: "Add Task" }}
        />
      </StackNavigator.Navigator>
    </BaseNavigationContainer>
  );
}