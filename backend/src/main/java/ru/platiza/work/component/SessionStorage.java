package ru.platiza.work.component;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;
import ru.platiza.work.service.ReservationService;

import javax.annotation.PreDestroy;
import java.util.UUID;

@Component
@SessionScope
public class SessionStorage {

    private ReservationService reservationService;

    @Autowired
    public void setReservationService(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @Getter
    private String uid;

    public SessionStorage(){
        this.uid = UUID.randomUUID().toString();
    }

    @PreDestroy
    public void destroy(){
        reservationService.cancel();
    }
}
