package eu.yperman.brecht.reservation.web.rest;

import eu.yperman.brecht.reservation.domain.Terrain;
import eu.yperman.brecht.reservation.service.TerrainService;
import eu.yperman.brecht.reservation.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link eu.yperman.brecht.reservation.domain.Terrain}.
 */
@RestController
@RequestMapping("/api")
public class TerrainResource {

    private final Logger log = LoggerFactory.getLogger(TerrainResource.class);

    private static final String ENTITY_NAME = "terrain";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TerrainService terrainService;

    public TerrainResource(TerrainService terrainService) {
        this.terrainService = terrainService;
    }

    /**
     * {@code POST  /terrains} : Create a new terrain.
     *
     * @param terrain the terrain to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new terrain, or with status {@code 400 (Bad Request)} if the terrain has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/terrains")
    public ResponseEntity<Terrain> createTerrain(@Valid @RequestBody Terrain terrain) throws URISyntaxException {
        log.debug("REST request to save Terrain : {}", terrain);
        if (terrain.getId() != null) {
            throw new BadRequestAlertException("A new terrain cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Terrain result = terrainService.save(terrain);
        return ResponseEntity.created(new URI("/api/terrains/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /terrains} : Updates an existing terrain.
     *
     * @param terrain the terrain to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated terrain,
     * or with status {@code 400 (Bad Request)} if the terrain is not valid,
     * or with status {@code 500 (Internal Server Error)} if the terrain couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/terrains")
    public ResponseEntity<Terrain> updateTerrain(@Valid @RequestBody Terrain terrain) throws URISyntaxException {
        log.debug("REST request to update Terrain : {}", terrain);
        if (terrain.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Terrain result = terrainService.save(terrain);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, terrain.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /terrains} : get all the terrains.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of terrains in body.
     */
    @GetMapping("/terrains")
    public List<Terrain> getAllTerrains() {
        log.debug("REST request to get all Terrains");
        return terrainService.findAll();
    }

    /**
     * {@code GET  /terrains/:id} : get the "id" terrain.
     *
     * @param id the id of the terrain to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the terrain, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/terrains/{id}")
    public ResponseEntity<Terrain> getTerrain(@PathVariable Long id) {
        log.debug("REST request to get Terrain : {}", id);
        Optional<Terrain> terrain = terrainService.findOne(id);
        return ResponseUtil.wrapOrNotFound(terrain);
    }

    /**
     * {@code DELETE  /terrains/:id} : delete the "id" terrain.
     *
     * @param id the id of the terrain to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/terrains/{id}")
    public ResponseEntity<Void> deleteTerrain(@PathVariable Long id) {
        log.debug("REST request to delete Terrain : {}", id);
        terrainService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
