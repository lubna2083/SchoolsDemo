package multiplats.schoolprojectdemo.controller;

import multiplats.schoolprojectdemo.model.City;
import multiplats.schoolprojectdemo.model.Grade;
import multiplats.schoolprojectdemo.model.School;
import multiplats.schoolprojectdemo.service.GradeService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grade")
public class GradeController {
    private final GradeService gradeService;

    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @GetMapping("/all")
    public List<Grade> getAllGrade() {
        try {
            return gradeService.getAll();
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving all grades", e);
        }
    }
    @GetMapping("/all/{page}")
    public ResponseEntity<Page<Grade>> getAllByPage(@PathVariable("page") Integer page){
        Page<Grade> grade = gradeService.getAllByPage(page);
        return new ResponseEntity<>(grade, HttpStatus.OK);
    }
    @GetMapping("/find/{gradeId}")
    public ResponseEntity<Grade> getById(@PathVariable("gradeId") Long gradeId){
        Grade grade = gradeService.findById(gradeId);
        return new ResponseEntity<>(grade, HttpStatus.OK);
    }

    @GetMapping("/checkCapacity/{gradeId}")
    public Integer checkCapacity(@PathVariable Long gradeId) {
        return gradeService.checkCapacity(gradeId);
    }
    @PostMapping("/save")
    public ResponseEntity<Grade> add(@RequestBody Grade grade){
        try{
            Grade newGrade = gradeService.add(grade);
            return new ResponseEntity<>(newGrade, HttpStatus.CREATED);
        }catch(Exception err){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @GetMapping("/findBySchool/{schoolId}")
    public ResponseEntity<List<Grade>> getAllByPage(@PathVariable("schoolId") Long schoolId){
        List<Grade> grade = gradeService.getGradesBySchool(schoolId);
        return new ResponseEntity<>(grade, HttpStatus.OK);
    }
}
