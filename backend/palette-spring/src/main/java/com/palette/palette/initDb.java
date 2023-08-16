package com.palette.palette;


import com.palette.palette.domain.makeup.entity.Color;
import com.palette.palette.domain.makeup.entity.MakeUpImage;
import com.palette.palette.domain.makeup.entity.MakeUp;
import com.palette.palette.domain.user.entity.Role;
import com.palette.palette.domain.user.entity.User;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * 애플리케이션 로딩 시점에 실행시키는 방법
 */
@Component
@RequiredArgsConstructor
public class initDb {

    private final InitService initService;
    private final PasswordEncoder passwordEncoder;


    @PostConstruct  // 스프링 빈이 다 등록되고 실행이 된다.
    public void init() {
        initService.makeupInit();
    }


    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;


        /**
         * 메이크업 샘플 더미 데이터 
         */
        public void makeupInit() {
            
            Color color1 = Color.builder()
                    .name("가을웜톤").build();
            em.persist(color1);

            Color color2 = Color.builder()
                    .name("봄웜톤").build();
            em.persist(color2);

            Color color3 = Color.builder()
                    .name("여름쿨톤").build();
            em.persist(color3);

            Color color4 = Color.builder()
                    .name("가을쿨톤").build();
            em.persist(color4);
            
            for (int i = 1; i <= 7; i++) {
                MakeUp makeUp = MakeUp.builder()
                        .name("classpath:/media/가을웜톤" + i + "png").color(color1).build();
                em.persist(makeUp);
            }

            for (int i = 1; i <= 7; i++) {
                MakeUp makeUp = MakeUp.builder()
                        .name("classpath:/media/봄웜톤" + i + "png").color(color2).build();
                em.persist(makeUp);
            }

            for (int i = 1; i <= 7; i++) {
                MakeUp makeUp = MakeUp.builder()
                        .name("classpath:/media/여름쿨톤" + i + "png").color(color3).build();
                em.persist(makeUp);
            }

            for (int i = 1; i <= 7; i++) {
                MakeUp makeUp = MakeUp.builder()
                        .name("classpath:/media/겨울쿨톤" + i + "png").color(color4).build();
                em.persist(makeUp);
            }
        }

        public void userInit() {
            User user1 = User.builder()
                    .email("111@111.com")
                    .password("111")
                    .name("짱구")
                    .birth("11.11.11")
                    .phone("111-1111-1111")
                    .nickname("짱구 닉네임")
                    .gender("M")
                    .createAt(LocalDateTime.now())
                    .role(Role.IF)
                    .isLeave(Boolean.FALSE)
                    .build();
            em.persist(user1);

            User user2 = User.builder()
                    .email("222@222.com")
                    .password("222")
                    .name("맹구")
                    .birth("22.22.22")
                    .phone("222-2222-2222")
                    .nickname("맹구 닉네임")
                    .gender("M")
                    .createAt(LocalDateTime.now())
                    .role(Role.USER)
                    .isLeave(Boolean.FALSE)
                    .build();
            em.persist(user2);

            User user3 = User.builder()
                    .email("333@333.com")
                    .password("333")
                    .name("유리")
                    .birth("33.33.33")
                    .phone("333-3333-3333")
                    .nickname("유리 닉네임")
                    .gender("F")
                    .createAt(LocalDateTime.now())
                    .role(Role.USER)
                    .isLeave(Boolean.FALSE)
                    .build();
            em.persist(user3);
        }

        public void colorInit() {
            MakeUp color1 = MakeUp.builder()
                    .name("봄웜톤")
                    .build();
            em.persist(color1);

            MakeUp color2 = MakeUp.builder()
                    .name("여름쿨톤")
                    .build();
            em.persist(color2);

            MakeUp color3 = MakeUp.builder()
                    .name("가을웜톤")
                    .build();
            em.persist(color3);

            MakeUp color4 = MakeUp.builder()
                    .name("겨울쿨톤")
                    .build();
            em.persist(color4);

            /**
             * classpath: 빼도 될듯
             */
            // 봄 웜톤 이미지
            MakeUpImage makeUpImage1 = MakeUpImage.builder()
                    .imageName("봄웜톤1")
                    .imagePath("classpath:/media/봄웜1.png")
                    .makeUp(color1)
                    .build();
            em.persist(makeUpImage1);

            MakeUpImage makeUpImage2 = MakeUpImage.builder()
                    .imageName("봄웜톤2")
                    .imagePath("classpath:/media/봄웜2.png")
                    .makeUp(color1)
                    .build();
            em.persist(makeUpImage2);

            MakeUpImage makeUpImage3 = MakeUpImage.builder()
                    .imageName("봄웜톤3")
                    .imagePath("classpath:/media/봄웜3.png")
                    .makeUp(color1)
                    .build();
            em.persist(makeUpImage3);

            MakeUpImage makeUpImage4 = MakeUpImage.builder()
                    .imageName("봄웜톤6")
                    .imagePath("classpath:/media/봄웜6.png")
                    .makeUp(color1)
                    .build();
            em.persist(makeUpImage4);

            // 여름쿨톤
            MakeUpImage makeUpImage5 = MakeUpImage.builder()
                    .imageName("여름쿨톤1")
                    .imagePath("classpath:/media/봄웜1.png")
                    .makeUp(color2)
                    .build();
            em.persist(makeUpImage5);

            MakeUpImage makeUpImage6 = MakeUpImage.builder()
                    .imageName("여름쿨톤2")
                    .imagePath("classpath:/media/봄웜1.png")
                    .makeUp(color2)
                    .build();
            em.persist(makeUpImage6);

            MakeUpImage makeUpImage7 = MakeUpImage.builder()
                    .imageName("여름쿨톤3")
                    .imagePath("classpath:/media/봄웜1.png")
                    .makeUp(color2)
                    .build();
            em.persist(makeUpImage7);

            MakeUpImage makeUpImage8 = MakeUpImage.builder()
                    .imageName("여름쿨톤4")
                    .imagePath("classpath:/media/봄웜1.png")
                    .makeUp(color2)
                    .build();
            em.persist(makeUpImage8);

            // 기을웜톤
            MakeUpImage makeUpImage9 = MakeUpImage.builder()
                    .imageName("기을웜톤1")
                    .imagePath("classpath:/media/가을웜1.png")
                    .makeUp(color3)
                    .build();
            em.persist(makeUpImage9);

            MakeUpImage makeUpImage10 = MakeUpImage.builder()
                    .imageName("기을웜톤2")
                    .imagePath("classpath:/media/가을웜2.png")
                    .makeUp(color3)
                    .build();
            em.persist(makeUpImage10);

            MakeUpImage makeUpImage11 = MakeUpImage.builder()
                    .imageName("기을웜톤3")
                    .imagePath("classpath:/media/가을웜3.png")
                    .makeUp(color3)
                    .build();
            em.persist(makeUpImage11);

            MakeUpImage makeUpImage12 = MakeUpImage.builder()
                    .imageName("기을웜톤4")
                    .imagePath("classpath:/media/가을웜4.png")
                    .makeUp(color3)
                    .build();
            em.persist(makeUpImage12);

            // 겨울쿨톤
            MakeUpImage makeUpImage13 = MakeUpImage.builder()
                    .imageName("겨울쿨톤1")
                    .imagePath("classpath:/media/겨울쿨1.png")
                    .makeUp(color4)
                    .build();
            em.persist(makeUpImage13);

            MakeUpImage makeUpImage14 = MakeUpImage.builder()
                    .imageName("겨울쿨톤2")
                    .imagePath("classpath:/media/겨울쿨2.png")
                    .makeUp(color4)
                    .build();
            em.persist(makeUpImage14);

            MakeUpImage makeUpImage15 = MakeUpImage.builder()
                    .imageName("겨울쿨톤3")
                    .imagePath("classpath:/media/겨울쿨3.png")
                    .makeUp(color4)
                    .build();
            em.persist(makeUpImage15);

            MakeUpImage makeUpImage16 = MakeUpImage.builder()
                    .imageName("겨울쿨톤4")
                    .imagePath("classpath:/media/겨울쿨4.png")
                    .makeUp(color4)
                    .build();
            em.persist(makeUpImage16);
        }
    }
}
