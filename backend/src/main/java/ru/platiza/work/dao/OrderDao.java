package ru.platiza.work.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.platiza.work.entity.Order;
import ru.platiza.work.entity.catalog.Film;
import ru.platiza.work.entity.catalog.Session;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderDao extends JpaRepository<Order, Long> {

    List<Order> getAllByDayAndFilmAndSession(LocalDate day, Film film, Session session);

}
