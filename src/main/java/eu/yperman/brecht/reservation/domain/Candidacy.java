package eu.yperman.brecht.reservation.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

import eu.yperman.brecht.reservation.domain.enumeration.CandidacyType;

/**
 * A Candidacy.
 */
@Entity
@Table(name = "candidacy")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Candidacy implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private CandidacyType type;

    @ManyToOne
    @JsonIgnoreProperties(value = "candidacies", allowSetters = true)
    private Reservation reservation;

    @ManyToOne
    @JsonIgnoreProperties(value = "candidacies", allowSetters = true)
    private User createdBy;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Candidacy createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public CandidacyType getType() {
        return type;
    }

    public Candidacy type(CandidacyType type) {
        this.type = type;
        return this;
    }

    public void setType(CandidacyType type) {
        this.type = type;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public Candidacy reservation(Reservation reservation) {
        this.reservation = reservation;
        return this;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public Candidacy createdBy(User user) {
        this.createdBy = user;
        return this;
    }

    public void setCreatedBy(User user) {
        this.createdBy = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Candidacy)) {
            return false;
        }
        return id != null && id.equals(((Candidacy) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Candidacy{" +
            "id=" + getId() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
