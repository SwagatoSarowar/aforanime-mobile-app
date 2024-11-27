import Toast, {
  ErrorToast,
  InfoToast,
  SuccessToast,
} from "react-native-toast-message";

const toastConfig = {
  success: (props: any) => (
    <SuccessToast
      {...props}
      style={{ backgroundColor: "#2B3035", borderLeftColor: "#28A745" }}
      text1Style={{ color: "#28A745", fontSize: 16, fontWeight: "700" }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: "#2B3035", borderLeftColor: "#f2685e" }}
      text1Style={{ color: "#f2685e", fontSize: 16, fontWeight: "700" }}
    />
  ),
  info: (props: any) => (
    <InfoToast
      {...props}
      style={{ backgroundColor: "#2B3035", borderLeftColor: "#619eed" }}
      text1Style={{ color: "#619eed", fontSize: 16, fontWeight: "700" }}
    />
  ),
};

export function ToastNotification() {
  return <Toast topOffset={60} config={toastConfig} visibilityTime={2500} />;
}
