package com.palette.palette.domain.cart.service;

import com.palette.palette.domain.cart.dto.CartAddReqDto;
import com.palette.palette.domain.cart.dto.CartItemDto;
import com.palette.palette.domain.cart.dto.CartItemOptionDto;
import com.palette.palette.domain.cart.dto.CartListResDto;
import com.palette.palette.domain.cart.entity.Cart;
import com.palette.palette.domain.cart.entity.CartItem;
import com.palette.palette.domain.cart.entity.CartItemOption;
import com.palette.palette.domain.cart.repository.CartItemOptionRepository;
import com.palette.palette.domain.cart.repository.CartItemRepository;
import com.palette.palette.domain.cart.repository.CartRepository;
import com.palette.palette.domain.item.entity.Item;
import com.palette.palette.domain.item.repository.ItemRepository;
import com.palette.palette.domain.itemOption.entity.ItemOption;
import com.palette.palette.domain.itemOption.repository.ItemOptionRepository;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CartService {

    private final ItemRepository itemRepository;
    private final ItemOptionRepository itemOptionRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final CartItemOptionRepository cartItemOptionRepository;
    private final JwtTokenProvider jwtTokenProvider;


    /**
     * 카트에 담기
     */

    @Transactional
    public Boolean insertCart(CartAddReqDto cartAddReqDto, HttpServletRequest request){

        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));

        Optional<User> user = userRepository.findByEmail(userEmail);

        // cart
        Cart cart = Cart.builder()
                .user(user.get())
                .count(0)
                .price(0)
                .build();

        // 장바구니 총 가격, 개수
        Integer totalPrice = 0;
        Integer totalCount = 0;

        for(CartItemDto cartItemDto : cartAddReqDto.getCartItemDtoList()){

            Item item = itemRepository.findById(cartItemDto.getItemId())
                    .orElseThrow(() ->  new IllegalArgumentException("아이템을 찾을 수 없습니다."));

            CartItem cartItem = CartItem.builder()
                    .item(item)
                    .cart(cart)
                    .build();

            Integer itemPrice = 0;
            Integer itemCount = 0;

            for(CartItemOptionDto cartItemOptionDto : cartItemDto.getItemOptionDtoList()){

                ItemOption itemOption = itemOptionRepository.findById(cartItemOptionDto.getItemOptionId())
                        .orElseThrow(() -> new IllegalArgumentException("아이템 옵션을 찾이 못했습니다. Item Option Id : " + cartItemOptionDto.getItemOptionId()));

                totalPrice += itemOption.getItem().getPrice() * cartItemOptionDto.getItemOptionCount();
                totalCount += cartItemOptionDto.getItemOptionCount();

                itemCount += cartItemOptionDto.getItemOptionCount();
                itemPrice += cartItemOptionDto.getItemOptionCount() * item.getPrice();

                CartItemOption cartItemOption = CartItemOption.builder()
                        .itemOption(itemOption)
                        .cartItem(cartItem)
                        .cartCount(cartItemOptionDto.getItemOptionCount())
                        .cartPrice(cartItemOptionDto.getItemOptionCount() * item.getPrice())
                        .build();

                cartItem.setCartCount(cartItemOptionDto.getItemOptionCount());
                cartItem.setCartPrice(itemOption.getItem().getPrice() * cartItemOptionDto.getItemOptionCount());

                cartItemOptionRepository.save(cartItemOption);
            }

            cartItemRepository.save(cartItem);

            totalPrice += item.getDeliveryFee();
        }

        cart.setPrice(totalPrice);
        cart.setCount(totalCount);

        return true;
    }

    /**
     * 카트 목록 조회
     */
    public List<CartListResDto> list(HttpServletRequest request){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        Optional<User> user = userRepository.findByEmail(userEmail);
        return cartRepository.findAllByUser(user.get()).stream()
                .map(CartListResDto::toDto)
                .collect(Collectors.toList());
    }

    /**
     * 카트 삭제
     */
    public Boolean deleteCart(HttpServletRequest request, Long cartId){
        cartItemRepository.deleteById(cartId);
        return true;
    }
}
