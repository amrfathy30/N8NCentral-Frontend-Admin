import { toast } from 'sonner';

export const showToastSuccess = (message: any) => {
    toast.success(message, {
        style: {
            background: '#2B7B4C',
            color: 'white',
      border: "none",
        },
    });
};

export const showToastInfo = (message: any) => {
    toast.success(message, {
        style: {
            background: '#fff',
            color: '#2B7B4C',
      border: "none",
        },
    });
};

export const showToastError = (message: any) => {
    toast.error(message, {
        style: {
            background: '#D14343',
            color: 'white',
      border: "none",
        },
    });
};
