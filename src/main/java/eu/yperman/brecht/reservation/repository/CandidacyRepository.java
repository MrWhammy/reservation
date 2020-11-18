package eu.yperman.brecht.reservation.repository;

import eu.yperman.brecht.reservation.domain.Candidacy;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Candidacy entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CandidacyRepository extends JpaRepository<Candidacy, Long> {

    @Query("select candidacy from Candidacy candidacy where candidacy.createdBy.login = ?#{principal.username}")
    List<Candidacy> findByCreatedByIsCurrentUser();
}
