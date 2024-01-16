package multiplats.schoolprojectdemo.configuration;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.lang.reflect.Field;
import java.sql.Date;

public class DateListener {
    @PreUpdate
    @PrePersist
    public void beforeSave(Object entity) {
        Field[] fields = entity.getClass().getDeclaredFields();

        for (Field field : fields) {
            if (field.getType() == Date.class) {
                field.setAccessible(true);
                try {
                    Date date = (Date) field.get(entity);
                    if (date != null) {
                        date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
                    }
                } catch (IllegalAccessException e) {
                    // Handle the exception as needed
                }
            }
        }
    }
}
