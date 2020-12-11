package eu.yperman.brecht.reservation.service;

import eu.yperman.brecht.reservation.domain.Reservation;

import eu.yperman.brecht.reservation.security.AuthoritiesConstants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Optional;

/**
 * Service Interface for managing {@link Reservation}.
 */
public interface ReservationService {

    /**
     * Save a reservation.
     *
     * @param reservation the entity to save.
     * @return the persisted entity.
     */
    Reservation save(Reservation reservation);

    /**
     * Get all the reservations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Reservation> findAll(Pageable pageable);


    /**
     * Get the "id" reservation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Reservation> findOne(Long id);

    /**
     * Delete the "id" reservation.
     *
     * @param reservation the ntity.
     */
    @PreAuthorize("hasRole('"+AuthoritiesConstants.ADMIN+"') or #reservation.createdBy.login == authentication.principal.username")
    void delete(Reservation reservation);
}
