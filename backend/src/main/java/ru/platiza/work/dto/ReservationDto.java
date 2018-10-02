package ru.platiza.work.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;

@Data
public class ReservationDto {
    @NotNull
    private Long film;
    @NotEmpty
    private String phone;
    @NotNull
    private LocalDate day;
    @NotNull
    private Long session;
    @NotEmpty
    private ArrayList<Long> places;
}
