interface FieldError {
    hasError: boolean;
    errorMessage: string;
}

interface FieldErrors {
    [key: string] : FieldError;
}

export default FieldErrors;