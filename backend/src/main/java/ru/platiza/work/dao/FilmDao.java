package ru.platiza.work.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Repository;
import ru.platiza.work.entity.catalog.Film;

import javax.persistence.LockModeType;

@Repository
public interface FilmDao extends JpaRepository<Film, Long> {

    @Lock(value = LockModeType.PESSIMISTIC_READ)
    Film getById(Long id);
}
