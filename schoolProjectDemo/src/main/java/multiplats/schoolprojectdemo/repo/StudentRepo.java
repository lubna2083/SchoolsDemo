package multiplats.schoolprojectdemo.repo;

import multiplats.schoolprojectdemo.interfaces.StudentDetails;
import multiplats.schoolprojectdemo.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StudentRepo extends JpaRepository<Student,Long> {
    @Query("SELECT s.studentId AS studentId," +
            "s.studentNameAr AS studentNameAr," +
            "s.studentNameEn AS studentNameEn," +

            "s.address AS address," +

            "s.grade.school.schoolNameAr AS schoolNameAr," +
            "s.grade.school.schoolNameEn AS schoolNameEn," +
            "s.grade.gradeNameAr AS gradeNameAr," +
            "s.grade.gradeNameEn AS gradeNameEn" +
            " FROM Student s")
    Page<StudentDetails> getStudentDetails(Pageable pageable);


}
