import { toast } from "sonner";

export const showToastSuccess = (message: string) => {
  toast.success(message, {
    style: {
      background: "#2B7B4C",
      color: "white",
    },
  });
};

export const showToastInfo = (message: string) => {
  toast.success(message, {
    style: {
      background: "#fff",
      color: "#2B7B4C",
    },
  });
};

export const showToastError = (message: string) => {
  toast.error(message, {
    style: {
      background: "#D14343",
      color: "white",
      whiteSpace: "pre-line",
    },
  });
};
