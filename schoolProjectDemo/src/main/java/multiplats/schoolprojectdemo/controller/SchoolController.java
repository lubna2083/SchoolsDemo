package multiplats.schoolprojectdemo.controller;

import multiplats.schoolprojectdemo.interfaces.SchoolDetails;
import multiplats.schoolprojectdemo.model.School;
import multiplats.schoolprojectdemo.service.SchoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/school")
public class SchoolController {
    private final SchoolService schoolService;
    @Autowired
    public SchoolController(SchoolService schoolService) {
        this.schoolService = schoolService;
    }

    @GetMapping("/all")
    public List<School> getAllSchools() {
        try {
            return schoolService.getAll();
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving all schools", e);
        }
    }

    @GetMapping("/all/{page}")
    public ResponseEntity<Page<SchoolDetails>> getAllByPage(@PathVariable("page") Integer page){
        Page<SchoolDetails> school = schoolService.getAllByPage(page);
        return new ResponseEntity<>(school, HttpStatus.OK);
    }
    @GetMapping("/find/{schoolId}")
    public ResponseEntity<School> getById(@PathVariable("schoolId") Long schoolId){
        School school = schoolService.findById(schoolId);
        return new ResponseEntity<>(school, HttpStatus.OK);
    }
    @PostMapping("/save")
    public ResponseEntity<School> add(@RequestBody School school){
        try{
            School newSchool = schoolService.add(school);
            return new ResponseEntity<>(newSchool, HttpStatus.CREATED);
        }catch(Exception err){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/findByCity/{cityId}")
    public ResponseEntity<List<School>> getAllByPage(@PathVariable("cityId") Long cityId){
        List<School> school = schoolService.getSchoolsByCity(cityId);
        return new ResponseEntity<>(school, HttpStatus.OK);
    }


}
