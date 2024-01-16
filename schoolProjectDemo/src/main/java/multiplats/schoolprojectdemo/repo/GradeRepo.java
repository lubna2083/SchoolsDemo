package multiplats.schoolprojectdemo.repo;

import multiplats.schoolprojectdemo.model.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GradeRepo extends JpaRepository<Grade,Long> {

    List<Grade> findGradsBySchool_SchoolId(long schoolId);



 @Query("SELECT g.maxAllowableLimit - COUNT(s) FROM Grade g " +
         " LEFT JOIN g.studentList s WHERE g.gradeId = :gradeId" +
         " GROUP BY g.gradeId, g.maxAllowableLimit")
 Integer checkCapacity(@Param("gradeId") Long gradeId);
    }

