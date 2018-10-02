package ru.platiza.work.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.platiza.work.dto.CatalogsDto;
import ru.platiza.work.dto.abstrct.PlaceDto;
import ru.platiza.work.entity.Order;
import ru.platiza.work.service.OrderService;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public List<Order> getAllOrders(){
        return Collections.emptyList();
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity setOrder(){
        orderService.create();
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/catalogs", method = RequestMethod.GET)
    @ResponseBody
    public CatalogsDto getCatalogs(){
        return orderService.getCatalogs();
    }

    @RequestMapping(value = "/report", method = RequestMethod.GET)
    @ResponseBody
    public List<PlaceDto> getPlaces(@RequestParam @NotNull Long filmId, @RequestParam @NotNull LocalDate day,
                                    @RequestParam @NotNull Long sessionId){
        return orderService.getPlaces(filmId, day, sessionId);
    }
}
