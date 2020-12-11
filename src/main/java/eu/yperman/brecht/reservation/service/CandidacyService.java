package eu.yperman.brecht.reservation.service;

import eu.yperman.brecht.reservation.domain.Candidacy;
import eu.yperman.brecht.reservation.domain.Reservation;
import eu.yperman.brecht.reservation.security.AuthoritiesConstants;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Candidacy}.
 */
public interface CandidacyService {

    /**
     * Save a candidacy.
     *
     * @param candidacy the entity to save.
     * @return the persisted entity.
     */
    @PreAuthorize("hasRole('"+ AuthoritiesConstants.ADMIN +"') or #candidacy.id == null or #candidacy.createdBy.login == authentication.principal.username")
    Candidacy save(Candidacy candidacy);

    /**
     * Get all the candidacies.
     *
     * @return the list of entities.
     */
    List<Candidacy> findAll();

    List<Candidacy> findByReservation(Long reservationId);


    /**
     * Get the "id" candidacy.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Candidacy> findOne(Long id);

    /**
     * Delete the "id" candidacy.
     *
     * @param candidacy the candidacy
     */
    @PreAuthorize("hasRole('"+ AuthoritiesConstants.ADMIN +"') or #candidacy.createdBy.login == authentication.principal.username")
    void delete(Candidacy candidacy);
}
