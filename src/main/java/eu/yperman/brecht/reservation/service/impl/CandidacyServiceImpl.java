package eu.yperman.brecht.reservation.service.impl;

import eu.yperman.brecht.reservation.repository.ReservationRepository;
import eu.yperman.brecht.reservation.service.CandidacyService;
import eu.yperman.brecht.reservation.domain.Candidacy;
import eu.yperman.brecht.reservation.repository.CandidacyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Candidacy}.
 */
@Service
@Transactional
public class CandidacyServiceImpl implements CandidacyService {

    private final Logger log = LoggerFactory.getLogger(CandidacyServiceImpl.class);

    private final CandidacyRepository candidacyRepository;

    public CandidacyServiceImpl(CandidacyRepository candidacyRepository) {
        this.candidacyRepository = candidacyRepository;
    }

    @Override
    public Candidacy save(Candidacy candidacy) {
        log.debug("Request to save Candidacy : {}", candidacy);
        return candidacyRepository.save(candidacy);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Candidacy> findAll() {
        log.debug("Request to get all Candidacies");
        return candidacyRepository.findAll();
    }

    @Override
    public List<Candidacy> findByReservation(Long reservationId) {
        log.debug("Request to get Candidacies by Reservation: {}", reservationId);
        return candidacyRepository.findByReservationId(reservationId);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Candidacy> findOne(Long id) {
        log.debug("Request to get Candidacy : {}", id);
        return candidacyRepository.findById(id);
    }

    @Override
    public void delete(Candidacy candidacy) {
        log.debug("Request to delete Candidacy : {}", candidacy.getId());
        candidacyRepository.deleteById(candidacy.getId());
    }
}
