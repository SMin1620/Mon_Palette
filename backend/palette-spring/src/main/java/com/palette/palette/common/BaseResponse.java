package com.palette.palette.common;

public record BaseResponse(
        StatusType status,
        String message,
        Object data
) {
    public static BaseResponse success(Object data){
        return new BaseResponse(StatusType.success, null, data);
    }

    public static BaseResponse error(String message){
        return new BaseResponse(StatusType.fail, message, null);
    }

}
