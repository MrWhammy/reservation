package eu.yperman.brecht.reservation.repository;

import eu.yperman.brecht.reservation.domain.Terrain;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Terrain entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TerrainRepository extends JpaRepository<Terrain, Long> {
}
