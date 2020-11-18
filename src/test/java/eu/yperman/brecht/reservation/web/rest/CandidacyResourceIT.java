package eu.yperman.brecht.reservation.web.rest;

import eu.yperman.brecht.reservation.ReservationApp;
import eu.yperman.brecht.reservation.domain.Candidacy;
import eu.yperman.brecht.reservation.repository.CandidacyRepository;
import eu.yperman.brecht.reservation.service.CandidacyService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import eu.yperman.brecht.reservation.domain.enumeration.CandidacyType;
/**
 * Integration tests for the {@link CandidacyResource} REST controller.
 */
@SpringBootTest(classes = ReservationApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CandidacyResourceIT {

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final CandidacyType DEFAULT_TYPE = CandidacyType.FULL;
    private static final CandidacyType UPDATED_TYPE = CandidacyType.IF_NECESSARY;

    @Autowired
    private CandidacyRepository candidacyRepository;

    @Autowired
    private CandidacyService candidacyService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCandidacyMockMvc;

    private Candidacy candidacy;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Candidacy createEntity(EntityManager em) {
        Candidacy candidacy = new Candidacy()
            .createdAt(DEFAULT_CREATED_AT)
            .type(DEFAULT_TYPE);
        return candidacy;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Candidacy createUpdatedEntity(EntityManager em) {
        Candidacy candidacy = new Candidacy()
            .createdAt(UPDATED_CREATED_AT)
            .type(UPDATED_TYPE);
        return candidacy;
    }

    @BeforeEach
    public void initTest() {
        candidacy = createEntity(em);
    }

    @Test
    @Transactional
    public void createCandidacy() throws Exception {
        int databaseSizeBeforeCreate = candidacyRepository.findAll().size();
        // Create the Candidacy
        restCandidacyMockMvc.perform(post("/api/candidacies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candidacy)))
            .andExpect(status().isCreated());

        // Validate the Candidacy in the database
        List<Candidacy> candidacyList = candidacyRepository.findAll();
        assertThat(candidacyList).hasSize(databaseSizeBeforeCreate + 1);
        Candidacy testCandidacy = candidacyList.get(candidacyList.size() - 1);
        assertThat(testCandidacy.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testCandidacy.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createCandidacyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = candidacyRepository.findAll().size();

        // Create the Candidacy with an existing ID
        candidacy.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCandidacyMockMvc.perform(post("/api/candidacies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candidacy)))
            .andExpect(status().isBadRequest());

        // Validate the Candidacy in the database
        List<Candidacy> candidacyList = candidacyRepository.findAll();
        assertThat(candidacyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCreatedAtIsRequired() throws Exception {
        int databaseSizeBeforeTest = candidacyRepository.findAll().size();
        // set the field null
        candidacy.setCreatedAt(null);

        // Create the Candidacy, which fails.


        restCandidacyMockMvc.perform(post("/api/candidacies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candidacy)))
            .andExpect(status().isBadRequest());

        List<Candidacy> candidacyList = candidacyRepository.findAll();
        assertThat(candidacyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCandidacies() throws Exception {
        // Initialize the database
        candidacyRepository.saveAndFlush(candidacy);

        // Get all the candidacyList
        restCandidacyMockMvc.perform(get("/api/candidacies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(candidacy.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getCandidacy() throws Exception {
        // Initialize the database
        candidacyRepository.saveAndFlush(candidacy);

        // Get the candidacy
        restCandidacyMockMvc.perform(get("/api/candidacies/{id}", candidacy.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(candidacy.getId().intValue()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCandidacy() throws Exception {
        // Get the candidacy
        restCandidacyMockMvc.perform(get("/api/candidacies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCandidacy() throws Exception {
        // Initialize the database
        candidacyService.save(candidacy);

        int databaseSizeBeforeUpdate = candidacyRepository.findAll().size();

        // Update the candidacy
        Candidacy updatedCandidacy = candidacyRepository.findById(candidacy.getId()).get();
        // Disconnect from session so that the updates on updatedCandidacy are not directly saved in db
        em.detach(updatedCandidacy);
        updatedCandidacy
            .createdAt(UPDATED_CREATED_AT)
            .type(UPDATED_TYPE);

        restCandidacyMockMvc.perform(put("/api/candidacies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCandidacy)))
            .andExpect(status().isOk());

        // Validate the Candidacy in the database
        List<Candidacy> candidacyList = candidacyRepository.findAll();
        assertThat(candidacyList).hasSize(databaseSizeBeforeUpdate);
        Candidacy testCandidacy = candidacyList.get(candidacyList.size() - 1);
        assertThat(testCandidacy.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testCandidacy.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingCandidacy() throws Exception {
        int databaseSizeBeforeUpdate = candidacyRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCandidacyMockMvc.perform(put("/api/candidacies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candidacy)))
            .andExpect(status().isBadRequest());

        // Validate the Candidacy in the database
        List<Candidacy> candidacyList = candidacyRepository.findAll();
        assertThat(candidacyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCandidacy() throws Exception {
        // Initialize the database
        candidacyService.save(candidacy);

        int databaseSizeBeforeDelete = candidacyRepository.findAll().size();

        // Delete the candidacy
        restCandidacyMockMvc.perform(delete("/api/candidacies/{id}", candidacy.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Candidacy> candidacyList = candidacyRepository.findAll();
        assertThat(candidacyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
