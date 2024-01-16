package multiplats.schoolprojectdemo.service;

import multiplats.schoolprojectdemo.configuration.ObjectNotFoundException;
import multiplats.schoolprojectdemo.model.City;
import multiplats.schoolprojectdemo.repo.CityRepo;
 import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {
private  final CityRepo cityRepo;

    public CityService(CityRepo cityRepo) {
        this.cityRepo = cityRepo;
    }
    public List<City> getAll(){
        return cityRepo.findAll();
    }
    public Page<City> getAllByPage(Integer page) {
        Pageable pageable = PageRequest.of(page, 10);
        return cityRepo.findAll(pageable);
    }
    public City findById(Long cityId) {
        return cityRepo.findById(cityId)
                .orElseThrow(() -> new ObjectNotFoundException("City by id: " + cityId + " not found"));
    }
    public City add(City city) {
        return cityRepo.save(city);
    }

}
