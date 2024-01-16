package multiplats.schoolprojectdemo.model;

import lombok.*;
import multiplats.schoolprojectdemo.configuration.DateListener;
import jakarta.persistence.*;
import multiplats.schoolprojectdemo.defaultList.Gender;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.sql.Date;

@Entity
@Getter
@Setter
@EntityListeners(DateListener.class)
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Student implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;

    private String studentNameAr;
    private String studentNameEn;
//    private Date birthdate;
//    @Enumerated(EnumType.STRING)
//    private Gender gender;
    private String address;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;
    @ManyToOne(targetEntity = Grade.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "gradeId",referencedColumnName = "gradeId", nullable = false)
    private Grade grade;

}
