package multiplats.schoolprojectdemo.service;

import multiplats.schoolprojectdemo.configuration.ObjectNotFoundException;
import multiplats.schoolprojectdemo.interfaces.StudentDetails;
import multiplats.schoolprojectdemo.model.Student;
import multiplats.schoolprojectdemo.repo.StudentRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepo studentRepo;

    public StudentService(StudentRepo studentRepo) {
        this.studentRepo = studentRepo;
    }
    public List<Student> getAll(){
        return studentRepo.findAll();
    }
    public Page<Student> getAllByPage(Integer page) {
        Pageable pageable = PageRequest.of(page, 10);
        return studentRepo.findAll(pageable);
    }
    public Student findById(Long studentId) {
        return studentRepo.findById(studentId)
                .orElseThrow(() -> new ObjectNotFoundException("Student by id: " + studentId + " not found"));
    }
    public Student add(Student student) {
        return studentRepo.save(student);
    }
    public Page<StudentDetails> getAllDetailsByPage(Integer page) {
        Pageable pageable = PageRequest.of(page, 10);
        return studentRepo.getStudentDetails(pageable);
    }

    public List<Student> addList(List<Student> students) {
        return studentRepo.saveAll(students);
    }
    public boolean deleteStudent(Long id) {
        if (studentRepo.existsById(id)) {
            studentRepo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
