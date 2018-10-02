package ru.platiza.work.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ru.platiza.work.entity.catalog.Film;
import ru.platiza.work.entity.catalog.Place;
import ru.platiza.work.entity.catalog.Session;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "orders")
public class Order extends BaseEntity {

    @Column
    @JsonProperty
    private LocalDate day;

    @Column
    @JsonProperty
    private String phone;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="film_id")
    @JsonProperty
    private Film film;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="session_id")
    @JsonProperty
    private Session session;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "order_place",
            joinColumns = @JoinColumn(name = "order_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "place_id", referencedColumnName = "id"))
    private List<Place> places;

    public Order(Reservation reservation) {
        this.day = reservation.getDay();
        this.phone = reservation.getPhone();
        this.film = reservation.getFilm();
        this.session = reservation.getSession();
        this.places = reservation.getPlaces();
    }
}
