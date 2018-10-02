package ru.platiza.work.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ru.platiza.work.component.SessionStorage;
import ru.platiza.work.entity.catalog.Film;
import ru.platiza.work.entity.catalog.Place;
import ru.platiza.work.entity.catalog.Session;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "reservations")
public class Reservation extends BaseEntity {

    @Column
    @JsonProperty
    private LocalDate day;

    @Column
    @JsonProperty
    private String phone;

    @Column(name = "user_session_id")
    @JsonProperty
    private String userSessionId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="film_id")
    @JsonProperty
    private Film film;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="session_id")
    @JsonProperty
    private Session session;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "reservation_place",
            joinColumns = @JoinColumn(name = "reservation_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "place_id", referencedColumnName = "id"))
    @OrderBy("name")
    @JsonProperty
    private List<Place> places;

    public Reservation(SessionStorage storage, Film film, Session session, List<Place> places, LocalDate day, String phone) {
        this.userSessionId = storage.getUid();
        this.film = film;
        this.session = session;
        this.places = places;
        this.day = day;
        this.phone = phone;
    }
}
