package ru.platiza.work.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.platiza.work.component.SessionStorage;
import ru.platiza.work.dao.*;
import ru.platiza.work.dto.ReservationDto;
import ru.platiza.work.entity.Order;
import ru.platiza.work.entity.Reservation;
import ru.platiza.work.entity.catalog.Film;
import ru.platiza.work.entity.catalog.Place;
import ru.platiza.work.entity.catalog.Session;
import ru.platiza.work.error.AppException;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static ru.platiza.work.error.ErrorEnum.DATA_NOT_FOUND;
import static ru.platiza.work.error.ErrorEnum.PLACE_IS_USE;

@Service
@RequiredArgsConstructor
public class ReservationServiceImp implements ReservationService {

    private final SessionStorage storage;

    private final ReservationDao reservationDao;

    private final OrderDao orderDao;

    private final FilmDao filmDao;

    private final PlaceDao placeDao;

    private final SessionDao sessionDao;

    @Transactional
    @Override
    public Reservation add(ReservationDto reservationDto) {

        Film film = filmDao.getById(reservationDto.getFilm());
        if(film == null) throw new AppException(DATA_NOT_FOUND);
        Optional<Session> session = sessionDao.findById(reservationDto.getSession());
        if(!session.isPresent()) throw new AppException(DATA_NOT_FOUND);
        List<Place> places = placeDao.findAllById(reservationDto.getPlaces());
        if(places.isEmpty()) throw new AppException(DATA_NOT_FOUND);

        List<Reservation> reservations = reservationDao.getAllByDayAndFilmAndSession(reservationDto.getDay(), film, session.get());
        List<Order> orders = orderDao.getAllByDayAndFilmAndSession(reservationDto.getDay(), film, session.get());

        Optional<Place> reservationPlace = reservations.stream().map(Reservation::getPlaces).flatMap(Collection::stream).filter(places::contains).findFirst();
        Optional<Place> orderPlace = orders.stream().map(Order::getPlaces).flatMap(Collection::stream).filter(places::contains).findFirst();
        if(reservationPlace.isPresent() || orderPlace.isPresent()) throw new AppException(PLACE_IS_USE);

        Reservation reservation = new Reservation(storage, film, session.get(), places, reservationDto.getDay(), reservationDto.getPhone());

        return reservationDao.save(reservation);
    }

    @Transactional
    @Override
    public void cancel() {
        reservationDao.deleteByUserSessionId(storage.getUid());
    }

    @Override
    public Reservation getCurrentSession() {
        return reservationDao.getByUserSessionId(storage.getUid());
    }

    @Override
    public List<Place> getUsedPlaces(Long filmId, LocalDate day, Long sessionId) {
        Optional<Film> film = filmDao.findById(filmId);
        if(!film.isPresent()) throw new AppException(DATA_NOT_FOUND);
        Optional<Session> session = sessionDao.findById(sessionId);
        if(!session.isPresent()) throw new AppException(DATA_NOT_FOUND);

        List<Reservation> reservations = reservationDao.getAllByDayAndFilmAndSession(day, film.get(), session.get());
        List<Order> orders = orderDao.getAllByDayAndFilmAndSession(day, film.get(), session.get());
        return Stream.concat(
                reservations.stream().map(Reservation::getPlaces).flatMap(Collection::stream),
                orders.stream().map(Order::getPlaces).flatMap(Collection::stream)
        ).collect(Collectors.toList());
    }
}
