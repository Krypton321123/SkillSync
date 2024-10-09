class ApiError extends Error {
    constructor(status, message="Something went wrong", data, errors) {
        super(message), 
        this.status = status, 
        this.data = data, 
        this.sucess = false, 
        this.errors = errors
    }
}