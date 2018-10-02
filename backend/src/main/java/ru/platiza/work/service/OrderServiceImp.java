package ru.platiza.work.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.platiza.work.dao.*;
import ru.platiza.work.dto.BuyPlaceDto;
import ru.platiza.work.dto.CatalogsDto;
import ru.platiza.work.dto.ReservedPlaceDto;
import ru.platiza.work.dto.abstrct.PlaceDto;
import ru.platiza.work.entity.Order;
import ru.platiza.work.entity.Reservation;
import ru.platiza.work.entity.catalog.Film;
import ru.platiza.work.entity.catalog.Place;
import ru.platiza.work.entity.catalog.Session;
import ru.platiza.work.error.AppException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static ru.platiza.work.error.ErrorEnum.*;

@Service
@RequiredArgsConstructor
public class OrderServiceImp implements OrderService {

    private final OrderDao orderDao;

    private final ReservationService reservationService;

    private final FilmDao filmDao;

    private final PlaceDao placeDao;

    private final SessionDao sessionDao;

    private final ReservationDao reservationDao;

    @Override
    public List<Order> getAll() {
        return orderDao.findAll();
    }

    @Transactional
    @Override
    public Order create() {
        Reservation reservation = reservationService.getCurrentSession();
        if(reservation == null) throw  new AppException(RESERVATION_ANNULLED);

        String phone = reservation.getPhone();
        Integer lastKey = Integer.valueOf(StringUtils.right(phone, 1));

        if ((lastKey & 1) != 0) throw new AppException(PAYMENT_ERROR);

        Order order = new Order(reservation);
        reservationService.cancel();


        return orderDao.save(order);
    }

    @Override
    public CatalogsDto getCatalogs() {
        Sort sortSession = new Sort(Sort.Direction.ASC, "ord");
        Sort sortFilm = new Sort(Sort.Direction.ASC, "name");
        List<Film> films = filmDao.findAll(sortFilm);
        List<Place> places = placeDao.findAll();
        List<Session> sessions = sessionDao.findAll(sortSession);
        return new CatalogsDto(films, places, sessions);
    }

    @Override
    public List<PlaceDto> getPlaces(Long filmId, LocalDate day, Long sessionId) {

        Optional<Film> film = filmDao.findById(filmId);
        if(!film.isPresent()) throw new AppException(DATA_NOT_FOUND);
        Optional<Session> session = sessionDao.findById(sessionId);
        if(!session.isPresent()) throw new AppException(DATA_NOT_FOUND);

        Stream<PlaceDto> resultStream = Stream.empty();

        List<Reservation> reservations = reservationDao.getAllByDayAndFilmAndSession(day, film.get(), session.get());
        List<Order> orders = orderDao.getAllByDayAndFilmAndSession(day, film.get(), session.get());
        for(Reservation reservation : reservations){
            Stream<PlaceDto> stream = reservation.getPlaces().stream().map(item -> new ReservedPlaceDto(item, reservation.getPhone()));
            resultStream = Stream.concat(resultStream, stream);
        }

        for(Order order : orders){
            Stream<PlaceDto> stream = order.getPlaces().stream().map(item -> new BuyPlaceDto(item, order.getPhone()));
            resultStream = Stream.concat(resultStream, stream);
        }
        return resultStream.collect(Collectors.toList());
    }
}
