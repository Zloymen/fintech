package ru.platiza.work.entity.catalog;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import ru.platiza.work.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@Data
class CatalogEntity extends BaseEntity {

    @Column
    @JsonProperty
    private String name;
}
