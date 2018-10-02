package ru.platiza.work.entity.catalog;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "sessions")
public class Session extends CatalogEntity {

    @Column
    private Integer ord;
}
