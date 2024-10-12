export class ApiResponse {
    constructor(status, data, message="sucess"){
        this.status = status, 
        this.data = data, 
        this.message = message, 
        this.success = status < 400
    }
}

