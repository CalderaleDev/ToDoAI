import * as React from "react";
import { useState } from "react";
import { StackNavigationProp } from "react-nativescript-navigation";
import { FlexboxLayout, TextField, Button } from "@nativescript/core";
import { supabase } from "../config/supabase";

interface AuthScreenProps {
  navigation: StackNavigationProp<any, "Auth">;
}

export function AuthScreen({ navigation }: AuthScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigation.navigate("TaskList");
    } catch (error) {
      console.error("Error signing in:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      // Show success message
      alert({
        title: "Success",
        message: "Please check your email for verification",
        okButtonText: "OK"
      });
    } catch (error) {
      console.error("Error signing up:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlexboxLayout flexDirection="column" justifyContent="center" alignItems="center" height="100%">
      <TextField
        hint="Email"
        keyboardType="email"
        autocorrect={false}
        autocapitalizationType="none"
        width="80%"
        text={email}
        onTextChange={(args) => setEmail(args.value)}
        className="input input-rounded m-b-10"
      />
      <TextField
        hint="Password"
        secure={true}
        width="80%"
        text={password}
        onTextChange={(args) => setPassword(args.value)}
        className="input input-rounded m-b-10"
      />
      <Button
        text={loading ? "Loading..." : "Sign In"}
        onTap={handleSignIn}
        isEnabled={!loading}
        className="btn btn-primary m-b-10"
        width="80%"
      />
      <Button
        text="Sign Up"
        onTap={handleSignUp}
        isEnabled={!loading}
        className="btn btn-outline"
        width="80%"
      />
    </FlexboxLayout>
  );
}