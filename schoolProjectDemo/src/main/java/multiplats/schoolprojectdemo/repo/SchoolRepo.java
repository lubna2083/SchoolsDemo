package multiplats.schoolprojectdemo.repo;

import multiplats.schoolprojectdemo.interfaces.SchoolDetails;
import multiplats.schoolprojectdemo.model.School;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SchoolRepo extends JpaRepository<School,Long> {
    @Query("SELECT s.schoolId AS schoolId," +
            "s.schoolNameAr AS schoolNameAr," +
            "s.schoolNameEn AS schoolNameEn," +
            "s.city.cityNameAr AS cityNameAr," +
            "s.city.cityNameEn AS cityNameEn" +
            " FROM School s")
    Page<SchoolDetails> getSchoolDetails(Pageable pageable);

    //List<School> findSchoolsByCityId(Long cityId);

    List<School> findSchoolsByCity_CityId(long cityId);
}
