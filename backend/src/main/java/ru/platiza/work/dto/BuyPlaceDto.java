package ru.platiza.work.dto;

import ru.platiza.work.dto.abstrct.PlaceDto;
import ru.platiza.work.entity.catalog.Place;

public class BuyPlaceDto extends PlaceDto {
    public BuyPlaceDto(Place place, String phone) {
        super(place, phone);
    }

    @Override
    public String getType() {
        return "Выкуплено";
    }
}
