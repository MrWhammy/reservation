package eu.yperman.brecht.reservation.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import eu.yperman.brecht.reservation.web.rest.TestUtil;

public class CandidacyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Candidacy.class);
        Candidacy candidacy1 = new Candidacy();
        candidacy1.setId(1L);
        Candidacy candidacy2 = new Candidacy();
        candidacy2.setId(candidacy1.getId());
        assertThat(candidacy1).isEqualTo(candidacy2);
        candidacy2.setId(2L);
        assertThat(candidacy1).isNotEqualTo(candidacy2);
        candidacy1.setId(null);
        assertThat(candidacy1).isNotEqualTo(candidacy2);
    }
}
