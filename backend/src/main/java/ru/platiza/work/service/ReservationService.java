package ru.platiza.work.service;

import ru.platiza.work.dto.ReservationDto;
import ru.platiza.work.entity.Reservation;
import ru.platiza.work.entity.catalog.Place;

import java.time.LocalDate;
import java.util.List;

public interface ReservationService {

    void cancel();
    Reservation add(ReservationDto reservation);

    Reservation getCurrentSession();

    List<Place> getUsedPlaces(Long filmId, LocalDate day, Long sessionId);
}
