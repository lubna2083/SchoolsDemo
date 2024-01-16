package multiplats.schoolprojectdemo.controller;

import multiplats.schoolprojectdemo.model.City;
import multiplats.schoolprojectdemo.service.CityService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/city")
public class CityController {
    private final CityService cityService;
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }
    @GetMapping("/all")
    public List<City> getAllCity() {
        try {
            return cityService.getAll();
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving all cities", e);
        }
    }
    @GetMapping("/all/{page}")
    public ResponseEntity<Page<City>> getAllByPage(@PathVariable("page") Integer page){
        Page<City> city = cityService.getAllByPage(page);
        return new ResponseEntity<>(city, HttpStatus.OK);
    }
    @GetMapping("/find/{cityId}")
    public ResponseEntity<City> getById(@PathVariable("cityId") Long cityId){
        City city = cityService.findById(cityId);
        return new ResponseEntity<>(city, HttpStatus.OK);
    }
    @PostMapping("/save")
    public ResponseEntity<City> add(@RequestBody City city){
        try{
            City newCity = cityService.add(city);
            return new ResponseEntity<>(newCity, HttpStatus.CREATED);
        }catch(Exception err){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
