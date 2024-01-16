package multiplats.schoolprojectdemo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class School implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long schoolId;
private String schoolNameAr;
    private String schoolNameEn;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;
    @ManyToOne(targetEntity = City.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "cityId",referencedColumnName = "cityId", nullable = false)
    private City city;

    @OneToMany(mappedBy = "school", cascade = CascadeType.ALL, orphanRemoval = false, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Grade> gradeList;
}
