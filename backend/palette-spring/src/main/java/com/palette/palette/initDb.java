package com.palette.palette;


import com.palette.palette.domain.color.entity.Color;
import com.palette.palette.domain.color.entity.ColorImage;
import com.palette.palette.domain.feed.entity.Feed;
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
//        initService.colorInit();
    }


    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;

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
            Color color1 = Color.builder()
                    .name("봄웜톤")
                    .build();
            em.persist(color1);

            Color color2 = Color.builder()
                    .name("여름쿨톤")
                    .build();
            em.persist(color2);

            Color color3 = Color.builder()
                    .name("가을웜톤")
                    .build();
            em.persist(color3);

            Color color4 = Color.builder()
                    .name("겨울쿨톤")
                    .build();
            em.persist(color4);

            // 봄 웜톤 이미지
            ColorImage colorImage1 = ColorImage.builder()
                    .imageName("봄웜톤1")
                    .imagePath("classpath:/봄웜1.png")
                    .color(color1)
                    .build();
            em.persist(colorImage1);

            ColorImage colorImage2 = ColorImage.builder()
                    .imageName("봄웜톤2")
                    .imagePath("classpath:봄웜2.png")
                    .color(color1)
                    .build();
            em.persist(colorImage2);

            ColorImage colorImage3 = ColorImage.builder()
                    .imageName("봄웜톤3")
                    .imagePath("classpath:봄웜3.png")
                    .color(color1)
                    .build();
            em.persist(colorImage3);

            ColorImage colorImage4 = ColorImage.builder()
                    .imageName("봄웜톤6")
                    .imagePath("classpath:봄웜6.png")
                    .color(color1)
                    .build();
            em.persist(colorImage4);

            // 여름쿨톤
            ColorImage colorImage5 = ColorImage.builder()
                    .imageName("여름쿨톤1")
                    .imagePath("classpath:봄웜1.png")
                    .color(color2)
                    .build();
            em.persist(colorImage5);

            ColorImage colorImage6 = ColorImage.builder()
                    .imageName("여름쿨톤2")
                    .imagePath("classpath:봄웜1.png")
                    .color(color2)
                    .build();
            em.persist(colorImage6);

            ColorImage colorImage7 = ColorImage.builder()
                    .imageName("여름쿨톤3")
                    .imagePath("classpath:봄웜1.png")
                    .color(color2)
                    .build();
            em.persist(colorImage7);

            ColorImage colorImage8 = ColorImage.builder()
                    .imageName("여름쿨톤4")
                    .imagePath("classpath:봄웜1.png")
                    .color(color2)
                    .build();
            em.persist(colorImage8);

            // 기을웜톤
            ColorImage colorImage9 = ColorImage.builder()
                    .imageName("기을웜톤1")
                    .imagePath("classpath:가을웜1.png")
                    .color(color3)
                    .build();
            em.persist(colorImage9);

            ColorImage colorImage10 = ColorImage.builder()
                    .imageName("기을웜톤2")
                    .imagePath("classpath:가을웜2.png")
                    .color(color3)
                    .build();
            em.persist(colorImage10);

            ColorImage colorImage11 = ColorImage.builder()
                    .imageName("기을웜톤3")
                    .imagePath("classpath:가을웜3.png")
                    .color(color3)
                    .build();
            em.persist(colorImage11);

            ColorImage colorImage12 = ColorImage.builder()
                    .imageName("기을웜톤4")
                    .imagePath("classpath:가을웜4.png")
                    .color(color3)
                    .build();
            em.persist(colorImage12);

            // 겨울쿨톤
            ColorImage colorImage13 = ColorImage.builder()
                    .imageName("겨울쿨톤1")
                    .imagePath("classpath:겨울쿨1.png")
                    .color(color4)
                    .build();
            em.persist(colorImage13);

            ColorImage colorImage14 = ColorImage.builder()
                    .imageName("겨울쿨톤2")
                    .imagePath("classpath:겨울쿨2.png")
                    .color(color4)
                    .build();
            em.persist(colorImage14);

            ColorImage colorImage15 = ColorImage.builder()
                    .imageName("겨울쿨톤3")
                    .imagePath("classpath:겨울쿨3.png")
                    .color(color4)
                    .build();
            em.persist(colorImage15);

            ColorImage colorImage16 = ColorImage.builder()
                    .imageName("겨울쿨톤4")
                    .imagePath("classpath:겨울쿨4.png")
                    .color(color4)
                    .build();
            em.persist(colorImage16);
        }
    }
}
