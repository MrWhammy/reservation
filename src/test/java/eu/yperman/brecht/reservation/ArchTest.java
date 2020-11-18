package eu.yperman.brecht.reservation;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("eu.yperman.brecht.reservation");

        noClasses()
            .that()
                .resideInAnyPackage("eu.yperman.brecht.reservation.service..")
            .or()
                .resideInAnyPackage("eu.yperman.brecht.reservation.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..eu.yperman.brecht.reservation.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
