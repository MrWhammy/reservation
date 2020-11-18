package eu.yperman.brecht.reservation.service.impl;

import eu.yperman.brecht.reservation.service.TerrainService;
import eu.yperman.brecht.reservation.domain.Terrain;
import eu.yperman.brecht.reservation.repository.TerrainRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Terrain}.
 */
@Service
@Transactional
public class TerrainServiceImpl implements TerrainService {

    private final Logger log = LoggerFactory.getLogger(TerrainServiceImpl.class);

    private final TerrainRepository terrainRepository;

    public TerrainServiceImpl(TerrainRepository terrainRepository) {
        this.terrainRepository = terrainRepository;
    }

    @Override
    public Terrain save(Terrain terrain) {
        log.debug("Request to save Terrain : {}", terrain);
        return terrainRepository.save(terrain);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Terrain> findAll() {
        log.debug("Request to get all Terrains");
        return terrainRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Terrain> findOne(Long id) {
        log.debug("Request to get Terrain : {}", id);
        return terrainRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Terrain : {}", id);
        terrainRepository.deleteById(id);
    }
}
