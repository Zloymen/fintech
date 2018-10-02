package ru.platiza.work.param;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Set;

@Data
public class OrderParam {

    @NotEmpty
    private String phone;
    @NotNull
    private Long filmId;
    @NotNull
    private Long sessionId;
    @NotNull
    private LocalDate day;
    @NotNull
    private Set<Long> places;
}
