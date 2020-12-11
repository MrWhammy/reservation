package eu.yperman.brecht.reservation.web.rest;

import eu.yperman.brecht.reservation.domain.Candidacy;
import eu.yperman.brecht.reservation.service.CandidacyService;
import eu.yperman.brecht.reservation.service.ReservationService;
import eu.yperman.brecht.reservation.service.UserService;
import eu.yperman.brecht.reservation.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link eu.yperman.brecht.reservation.domain.Candidacy}.
 */
@RestController
@RequestMapping("/api")
public class CandidacyResource {

    private final Logger log = LoggerFactory.getLogger(CandidacyResource.class);

    private static final String ENTITY_NAME = "candidacy";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CandidacyService candidacyService;

    private final UserService userService;

    public CandidacyResource(CandidacyService candidacyService, UserService userService) {
        this.candidacyService = candidacyService;
        this.userService = userService;
    }

    /**
     * {@code POST  /candidacies} : Create a new candidacy.
     *
     * @param candidacy the candidacy to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new candidacy, or with status {@code 400 (Bad Request)} if the candidacy has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/candidacies")
    public ResponseEntity<Candidacy> createCandidacy(@RequestBody Candidacy candidacy) throws URISyntaxException {
        log.debug("REST request to save Candidacy : {}", candidacy);
        if (candidacy.getId() != null) {
            throw new BadRequestAlertException("A new candidacy cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Candidacy result = candidacyService.save(candidacy.createdAt(Instant.now()).createdBy(userService.getUserWithAuthorities().get()));
        return ResponseEntity.created(new URI("/api/candidacies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /candidacies} : Updates an existing candidacy.
     *
     * @param candidacy the candidacy to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated candidacy,
     * or with status {@code 400 (Bad Request)} if the candidacy is not valid,
     * or with status {@code 500 (Internal Server Error)} if the candidacy couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/candidacies")
    public ResponseEntity<Candidacy> updateCandidacy(@Valid @RequestBody Candidacy candidacy) throws URISyntaxException {
        log.debug("REST request to update Candidacy : {}", candidacy);
        if (candidacy.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Candidacy result = candidacyService.save(candidacy);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, candidacy.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /candidacies} : get all the candidacies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of candidacies in body.
     */
    @GetMapping("/candidacies")
    public List<Candidacy> getAllCandidacies(@RequestParam(required = false) Long reservation) {
        if (reservation == null) {
            log.debug("REST request to get all Candidacies");
            return candidacyService.findAll();
        } else {
            log.debug("REST request to get Candidacies for reservation "+reservation);
            return candidacyService.findByReservation(reservation);
        }
    }

    /**
     * {@code GET  /candidacies/:id} : get the "id" candidacy.
     *
     * @param id the id of the candidacy to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the candidacy, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/candidacies/{id}")
    public ResponseEntity<Candidacy> getCandidacy(@PathVariable Long id) {
        log.debug("REST request to get Candidacy : {}", id);
        Optional<Candidacy> candidacy = candidacyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(candidacy);
    }

    /**
     * {@code DELETE  /candidacies/:id} : delete the "id" candidacy.
     *
     * @param id the id of the candidacy to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/candidacies/{id}")
    public ResponseEntity<Void> deleteCandidacy(@PathVariable Long id) {
        log.debug("REST request to delete Candidacy : {}", id);
        candidacyService.delete(candidacyService.findOne(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
