import { icons } from "@/constants";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect } from "react";
import Toast from "react-native-toast-message";
import { CustomButton } from "./CustomButton";

const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export function OAuth() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleOAuthPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        Toast.show({ type: "error", text1: "Something went wrong." });
      }
    } catch (err) {
      console.log("OAuth error", JSON.stringify(err));
    }
  }, []);

  return (
    <CustomButton
      title="Login with Google"
      iconLeft={icons.google}
      variant="outline"
      className="bg-dark-400"
      onPress={handleOAuthPress}
    />
  );
}
