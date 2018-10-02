package ru.platiza.work.service;

import ru.platiza.work.dto.CatalogsDto;
import ru.platiza.work.dto.abstrct.PlaceDto;
import ru.platiza.work.entity.Order;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {
    List<Order> getAll();

    Order create();

    CatalogsDto getCatalogs();

    List<PlaceDto> getPlaces(Long filmId, LocalDate day, Long sessionId);
}
