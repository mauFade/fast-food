import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";
import * as z from "zod";

import CustomButton from "@/components/custom-button";
import CustomInput from "@/components/custom-input";

const schema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  // Simulated API Call
  const onSubmit = async (data: FormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form Submitted:", data);
      Alert.alert("Success", "You are signed in!");
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View className="gap-6 bg-white rounded-lg p-5 mt-5">
      <Text className="text-2xl font-bold">Sign in</Text>

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
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <CustomButton
        title="Sign in"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting || !isValid}
        isLoading={isSubmitting}
      />

      <View className="flex justify-center mt-5 flex-row">
        <Text className="text-gray-500">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-primary  base-bold">
            Sign up
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default SignIn;
