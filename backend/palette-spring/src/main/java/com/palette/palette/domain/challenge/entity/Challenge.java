package com.palette.palette.domain.challenge.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SQLDelete(sql = "UPDATE challenges SET is_delete = true, delete_at = CURRENT_TIMESTAMP WHERE challenge_id = ?")  // delete 쿼리가 발생하면 해당 쿼리가 대신 실행.
@Where(clause = "is_delete = false") // select 쿼리가 발생할 때, 디폴트 값으로 추가되어서 쿼리가 실행.
@Builder
@Entity
@Table(name = "challenges")
public class Challenge {

    @Id
    @GeneratedValue
    @Column(name = "challenge_id")
    private Long id;

    @Column(nullable = false)
    private String video;

    @Column(nullable = false)
    private String content;

    private Boolean isDelete;

    private LocalDateTime deleteAt;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;


}
