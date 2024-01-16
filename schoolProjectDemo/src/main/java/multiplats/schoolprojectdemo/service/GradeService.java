package multiplats.schoolprojectdemo.service;

import multiplats.schoolprojectdemo.configuration.ObjectNotFoundException;
import multiplats.schoolprojectdemo.model.City;
import multiplats.schoolprojectdemo.model.Grade;
import multiplats.schoolprojectdemo.model.School;
import multiplats.schoolprojectdemo.repo.GradeRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeService {
private final GradeRepo gradeRepo;

    public GradeService(GradeRepo gradeRepo) {
        this.gradeRepo = gradeRepo;
    }

    public List<Grade> getAll(){
        return gradeRepo.findAll();
    }

    public Page<Grade> getAllByPage(Integer page) {
        Pageable pageable = PageRequest.of(page, 10);
        return gradeRepo.findAll(pageable);
    }
    public Grade findById(Long gradeId) {
        return gradeRepo.findById(gradeId)
                .orElseThrow(() -> new ObjectNotFoundException("Grade by id: " + gradeId + " not found"));
    }
    public Grade add(Grade grade) {
        return gradeRepo.save(grade);
    }
    public List<Grade> getGradesBySchool(Long schoolId){
        return gradeRepo.findGradsBySchool_SchoolId(schoolId.longValue());
    }
    public Integer checkCapacity(Long gradeId) {
        return gradeRepo.checkCapacity(gradeId);
    }
}
