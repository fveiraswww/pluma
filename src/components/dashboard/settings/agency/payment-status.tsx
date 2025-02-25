import {AlertCircle, CheckCircle, Clock} from "lucide-react";
import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";

import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

export function PaymentStatus({payment_state}: {payment_state: "success" | "pending" | "error"}) {
  const router = useRouter();
  const pathname = usePathname();

  const stateConfig = {
    success: {
      title: "Payment Approved",
      description: "Your transaction has been completed successfully",
      icon: <CheckCircle className="mr-2 inline-block h-5 w-5 !text-green-600" />,
      alertClass: "border-green-200 bg-green-50 transition-all",
      titleClass: "text-lg text-green-800",
      descriptionClass: "text-green-700",
      message:
        "Thank you for your payment! We have received and processed your payment successfully. Please note that it may take a few moments to be reflected in your account.",
    },
    pending: {
      title: "Payment Pending",
      description: "Your transaction is being processed",
      icon: <Clock className="mr-2 inline-block h-5 w-5 !text-yellow-600" />,
      alertClass: "border-yellow-200 bg-yellow-50 transition-all",
      titleClass: "text-lg text-yellow-800",
      descriptionClass: "text-yellow-700",
      message: "Your payment is being processed. We will notify you when it's complete.",
    },
    error: {
      title: "Payment Rejected",
      description: "Your transaction could not be completed",
      icon: <AlertCircle className="mr-2 inline-block h-5 w-5 !text-red-600" />,
      alertClass: "border-red-200 bg-red-50 transition-all",
      titleClass: "text-lg text-red-800",
      descriptionClass: "text-red-700",
      message: "There was a problem with your payment. Please try again.",
    },
  };

  const {title, description, icon, alertClass, titleClass, descriptionClass, message} =
    stateConfig[payment_state];

  useEffect(() => {
    router.refresh();

    setTimeout(() => {
      router.push(pathname);
    }, 20000);
  }, []);

  return (
    <Alert className={alertClass}>
      <AlertTitle className={titleClass}>
        {icon}
        {title}
      </AlertTitle>
      <AlertDescription className={descriptionClass}>{message}</AlertDescription>
    </Alert>
  );
}
