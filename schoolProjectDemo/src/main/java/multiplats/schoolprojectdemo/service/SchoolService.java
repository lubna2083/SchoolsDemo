package multiplats.schoolprojectdemo.service;

import multiplats.schoolprojectdemo.configuration.ObjectNotFoundException;
import multiplats.schoolprojectdemo.interfaces.SchoolDetails;
import multiplats.schoolprojectdemo.model.School;
import multiplats.schoolprojectdemo.repo.SchoolRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchoolService {
private final SchoolRepo schoolRepo;

    public SchoolService(SchoolRepo schoolRepo) {
        this.schoolRepo = schoolRepo;
    }
public List<School> getAll(){
return schoolRepo.findAll();
}

    public Page<SchoolDetails> getAllByPage(Integer page) {
        Pageable pageable = PageRequest.of(page, 10);
        return schoolRepo.getSchoolDetails(pageable);
    }
    public School findById(Long schoolId) {
        return schoolRepo.findById(schoolId)
                .orElseThrow(() -> new ObjectNotFoundException("School by id: " + schoolId + " not found"));
    }
    public School add(School school) {
        return schoolRepo.save(school);
    }
    public List<School> getSchoolsByCity(Long cityId){
        return schoolRepo.findSchoolsByCity_CityId(cityId.longValue());
    }
}
