package multiplats.schoolprojectdemo.configuration;


import multiplats.schoolprojectdemo.model.City;
import multiplats.schoolprojectdemo.model.School;
import multiplats.schoolprojectdemo.repo.CityRepo;
import multiplats.schoolprojectdemo.repo.SchoolRepo;
import multiplats.schoolprojectdemo.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final StudentRepo studentRepository;
private final CityRepo cityRepo;
private final SchoolRepo schoolRepo;
    @Autowired
    public DataLoader(StudentRepo studentRepository, CityRepo cityRepo, SchoolRepo schoolRepo) {
        this.studentRepository = studentRepository;
        this.cityRepo = cityRepo;
        this.schoolRepo = schoolRepo;
    }

    @Override
    public void run(String... args) throws Exception {
//Student std1= new Student();
//std1.setFirstName("Lubna");
   // studentRepository.save(std1);
//        City city= new City();
//        city.setCityNameEn("Irbid");
//        cityRepo.save(city);
//        City savedCity=new City();
//        savedCity= cityRepo.findById(1L).orElse(null);
//
//        School school= new School();
//        school.setSchoolNameEn("Jamila");
//        school.setCity(savedCity);
//        schoolRepo.save(school);
    }

}
