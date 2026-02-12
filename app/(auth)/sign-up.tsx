import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, Text, View } from "react-native";
import * as z from "zod";

import CustomButton from "@/components/custom-button";
import CustomInput from "@/components/custom-input";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpData = z.infer<typeof schema>;

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<SignUpData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Account Created:", data);
      Alert.alert("Success", "Account created successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to sign up");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="gap-6 bg-white rounded-lg p-5 mt-5">
        <Text className="text-2xl font-bold">Create Account</Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label="Full Name"
              placeholder="Enter your name"
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label="E-mail"
              placeholder="Enter your e-mail"
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label="Password"
              placeholder="Create a password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <CustomButton
          title={isSubmitting ? "Creating Account..." : "Sign Up"}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting || !isValid}
        />

        <View className="flex justify-center mt-5 flex-row">
          <Text className="text-gray-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary  base-bold">
              Sign in
            </Link>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
