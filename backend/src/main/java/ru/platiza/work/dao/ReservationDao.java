package ru.platiza.work.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.platiza.work.entity.Reservation;
import ru.platiza.work.entity.catalog.Film;
import ru.platiza.work.entity.catalog.Session;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationDao extends JpaRepository<Reservation, Long> {

    void deleteByUserSessionId(String sessionId);

    Reservation getByUserSessionId(String sessionId);

    List<Reservation> getAllByDayAndFilmAndSession(LocalDate day, Film film, Session session);
}
