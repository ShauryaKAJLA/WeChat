class apiError
{
    constructor(statusCode,message="something went wrong",error=[],stack="")
    {
        this.statusCode=statusCode
        this.message=message
        this.data=null
        this.error=error
        this.success=false
    }
}

export default apiError