package ru.platiza.work.entity.catalog;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "Films")
public class Film extends CatalogEntity {
}
