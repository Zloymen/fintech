package ru.platiza.work.error;

import lombok.Getter;

public enum ErrorEnum {

    DATA_NOT_FOUND(1,"данные не найдены!"),
    PLACE_IS_USE(2, "места уже проданы!"),
    RESERVATION_ANNULLED(3, "Бронирование аннулировано!"),
    PAYMENT_ERROR(4, "ошибка платежа"),
    ;

    @Getter
    private Integer code;

    @Getter
    private String msg;

    ErrorEnum(Integer code, String msg){
        this.msg = msg;
        this.code = code;
    }
}
