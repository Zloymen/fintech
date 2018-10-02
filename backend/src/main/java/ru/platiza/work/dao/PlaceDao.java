package ru.platiza.work.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.platiza.work.entity.catalog.Place;

@Repository
public interface PlaceDao extends JpaRepository<Place, Long> {
}
