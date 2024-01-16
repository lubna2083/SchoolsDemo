package multiplats.schoolprojectdemo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import multiplats.schoolprojectdemo.configuration.DateListener;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

@Entity
@Getter
@Setter
@EntityListeners(DateListener.class)
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class City implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cityId;
    private String cityNameAr;
    private String cityNameEn;
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = true, updatable = true)
    private Date updatedAt;

    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL, orphanRemoval = false, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<School> schoolList;
}
