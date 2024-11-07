class ApiError{
    constructor(status, message="Something went wrong", data, errors) {
        // super(message) 
        this.message = message, 
        this.status = status, 
        this.data = data, 
        this.success = false, 
        this.errors = errors
    }
}

export { ApiError }; 