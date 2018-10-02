package ru.platiza.work.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.platiza.work.dto.ReservationDto;
import ru.platiza.work.entity.Reservation;
import ru.platiza.work.entity.catalog.Place;
import ru.platiza.work.service.ReservationService;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/reservation")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Reservation> get(){

        Reservation reservation = reservationService.getCurrentSession();

        return reservation == null ? new ResponseEntity(HttpStatus.NO_CONTENT) :  new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    @ResponseBody
    public Reservation save(@RequestBody ReservationDto dto){
        return reservationService.add(dto);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity delete(){
        reservationService.cancel();
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/usedPlaces", method = RequestMethod.GET)
    @ResponseBody
    public List<Place> getPlace(@RequestParam @NotNull Long filmId, @RequestParam @NotNull LocalDate day,
                                @RequestParam @NotNull Long sessionId){

        return reservationService.getUsedPlaces(filmId, day, sessionId);
    }
}
