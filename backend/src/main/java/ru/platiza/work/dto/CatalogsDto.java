package ru.platiza.work.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import ru.platiza.work.entity.catalog.Film;
import ru.platiza.work.entity.catalog.Place;
import ru.platiza.work.entity.catalog.Session;

import java.util.List;

@Data
public class CatalogsDto {

    @JsonProperty
    private List<Film> films;
    @JsonProperty
    private List<Place> places;
    @JsonProperty
    private List<Session> sessions;

    public CatalogsDto(List<Film> films, List<Place> places, List<Session> sessions){
        this.films = films;
        this.places = places;
        this.sessions = sessions;
    }
}
