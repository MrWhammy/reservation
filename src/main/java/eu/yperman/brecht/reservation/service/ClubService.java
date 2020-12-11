package eu.yperman.brecht.reservation.service;

import eu.yperman.brecht.reservation.domain.Club;
import eu.yperman.brecht.reservation.security.AuthoritiesConstants;
import org.springframework.security.access.annotation.Secured;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Club}.
 */
public interface ClubService {

    /**
     * Save a club.
     *
     * @param club the entity to save.
     * @return the persisted entity.
     */
    @Secured(AuthoritiesConstants.ADMIN)
    Club save(Club club);

    /**
     * Get all the clubs.
     *
     * @return the list of entities.
     */
    List<Club> findAll();


    /**
     * Get the "id" club.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Club> findOne(Long id);

    /**
     * Delete the "id" club.
     *
     * @param id the id of the entity.
     */
    @Secured(AuthoritiesConstants.ADMIN)
    void delete(Long id);
}
