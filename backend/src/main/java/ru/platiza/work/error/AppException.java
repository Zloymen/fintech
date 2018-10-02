package ru.platiza.work.error;

public class AppException extends RuntimeException {

    private ErrorEnum error;

    public String getText(){
        return error.getMsg();
    }

    public AppException(ErrorEnum error){
        this.error = error;
    }
}
