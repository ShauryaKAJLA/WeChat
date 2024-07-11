class apiResponse
{
    constructor(statusCode,data={},message="Successfull response")
    {
        this.statusCode=statusCode
        this.data=data
        this.message=message
        this.success=true
    }
} 

export default apiResponse