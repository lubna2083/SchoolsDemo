package multiplats.schoolprojectdemo.controller;

import multiplats.schoolprojectdemo.interfaces.StudentDetails;
import multiplats.schoolprojectdemo.model.Student;
import multiplats.schoolprojectdemo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

     @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAll();
    }

    @GetMapping("/all/{page}")
    public ResponseEntity<Page<StudentDetails>> getAllByPage(@PathVariable("page") Integer page){
        Page<StudentDetails> student = studentService.getAllDetailsByPage(page);
        return new ResponseEntity<>(student, HttpStatus.OK);
    }
    @PostMapping("/saveAll")
    public ResponseEntity<List<Student>> add(@RequestBody List<Student> students){
        try{
            List<Student> newStudents = studentService.addList(students);
            return new ResponseEntity<>(newStudents, HttpStatus.CREATED);
        }catch(Exception err){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PutMapping("/delete/{id}")
    public ResponseEntity<String> deleteService(@PathVariable Long id) {
        boolean deleted = studentService.deleteStudent(id);

        if (deleted) {
            return ResponseEntity.ok("Student deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
