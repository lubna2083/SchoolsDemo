package multiplats.schoolprojectdemo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Grade implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gradeId;
    private String gradeNameAr;
    private String gradeNameEn;
    private Integer maxAllowableLimit;
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;
    @ManyToOne(targetEntity = School.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "schoolId",referencedColumnName = "schoolId", nullable = false)
    private School school;
    @OneToMany(mappedBy = "grade", cascade = CascadeType.ALL, orphanRemoval = false, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Student> studentList;
}
