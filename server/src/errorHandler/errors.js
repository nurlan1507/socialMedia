class ApiError extends Error{
    status;
    errors;
    constructor(description, status,errors=[]) {
        super(description);
        this.status= status;
        this.errors=errors;
    }
}
module.exports= ApiError;
