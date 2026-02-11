import { router } from "expo-router";
import { Button, Text, View } from "react-native";

const SignIn = () => {
  return (
    <View>
      <Text>Sign in page</Text>
      <Button title="Sign up" onPress={() => router.push("/sign-up")} />
    </View>
  );
};

export default SignIn;
