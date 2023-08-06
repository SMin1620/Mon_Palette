package com.palette.palette.domain.order.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.order.dto.create.OrderCreateReqDto;
import com.palette.palette.domain.order.service.OrderService;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.jwt.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.attribute.UserPrincipalNotFoundException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/order")
@Slf4j
@Tag(name = "주문 API")
public class OrderController {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final OrderService orderService;


    @Operation(summary = "주문 생성")
    @PostMapping()
    public BaseResponse orderCreate(
            @RequestBody OrderCreateReqDto orderCreateReqDto,
            HttpServletRequest request
    ) {
        System.out.println("주문 생성 컨트롤러");

        try {
            /////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
            String token = jwtTokenProvider.resolveToken(request);
            jwtTokenProvider.validateToken(token);

            System.out.println("token >>> " + token);

            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = userRepository.findByEmail(userDetails.getUsername()).get();

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (user == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            orderService.orderCreate(orderCreateReqDto);

            return BaseResponse.success(true);
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("주문 생성 실패");
        }
    }
}
