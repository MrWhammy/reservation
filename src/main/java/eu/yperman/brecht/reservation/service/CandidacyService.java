package eu.yperman.brecht.reservation.service;

import eu.yperman.brecht.reservation.domain.Candidacy;

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
    Candidacy save(Candidacy candidacy);

    /**
     * Get all the candidacies.
     *
     * @return the list of entities.
     */
    List<Candidacy> findAll();


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
     * @param id the id of the entity.
     */
    void delete(Long id);
}
