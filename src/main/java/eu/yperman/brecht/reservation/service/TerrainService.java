package eu.yperman.brecht.reservation.service;

import eu.yperman.brecht.reservation.domain.Terrain;
import eu.yperman.brecht.reservation.security.AuthoritiesConstants;
import org.springframework.security.access.annotation.Secured;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Terrain}.
 */
public interface TerrainService {

    /**
     * Save a terrain.
     *
     * @param terrain the entity to save.
     * @return the persisted entity.
     */
    @Secured(AuthoritiesConstants.ADMIN)
    Terrain save(Terrain terrain);

    /**
     * Get all the terrains.
     *
     * @return the list of entities.
     */
    List<Terrain> findAll();


    /**
     * Get the "id" terrain.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Terrain> findOne(Long id);

    /**
     * Delete the "id" terrain.
     *
     * @param id the id of the entity.
     */
    @Secured(AuthoritiesConstants.ADMIN)
    void delete(Long id);
}
