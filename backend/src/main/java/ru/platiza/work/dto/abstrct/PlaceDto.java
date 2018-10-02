package ru.platiza.work.dto.abstrct;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.platiza.work.entity.catalog.Place;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class PlaceDto {

    @JsonProperty
    private Place place;

    @JsonProperty
    private String phone;

    @JsonProperty
    public abstract String getType();


}
