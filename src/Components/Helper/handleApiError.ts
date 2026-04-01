import { showToastError } from './toastHelper';

export const handleApiError = (error: any) => {
    const apiError = error?.data || error;

    if (apiError?.errors && Object.keys(apiError.errors).length > 0) {
        const messages = Object.values(apiError.errors).flat().join('\n');
        showToastError(messages);
    } else {
        showToastError(apiError?.message || 'حدث خطأ غير متوقع، حاول مرة أخرى');
    }
};
