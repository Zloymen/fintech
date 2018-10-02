package ru.platiza.work.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.platiza.work.entity.catalog.Session;

@Repository
public interface SessionDao extends JpaRepository<Session, Long> {
}
