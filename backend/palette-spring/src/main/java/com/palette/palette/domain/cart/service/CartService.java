package com.palette.palette.domain.cart.service;

import com.palette.palette.domain.cart.dto.*;
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
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
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

        Optional<Cart> cart = cartRepository.findByUser(user.get());

        if(cart.isEmpty()){
            // cart
            Cart newCart = Cart.builder()
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
                        .cart(newCart)
                        .build();

                Integer itemPrice = 0;
                Integer itemCount = 0;

                for(CartItemOptionDto cartItemOptionDto : cartItemDto.getItemOptionDtoList()){

                    ItemOption itemOption = itemOptionRepository.findById(cartItemOptionDto.getItemOptionId())
                            .orElseThrow(() -> new IllegalArgumentException("아이템 옵션을 찾이 못했습니다. Item Option Id : " + cartItemOptionDto.getItemOptionId()));

                    totalPrice += itemOption.getItem().getPrice() * cartItemOptionDto.getItemOptionCount();
                    totalCount += cartItemOptionDto.getItemOptionCount();

                    itemCount += cartItemOptionDto.getItemOptionCount();
                    itemPrice +=cartItemOptionDto.getItemOptionCount() * item.getPrice();

                    CartItemOption cartItemOption = CartItemOption.builder()
                            .itemOption(itemOption)
                            .cartItem(cartItem)
                            .cartCount(cartItemOptionDto.getItemOptionCount())
                            .cartPrice(cartItemOptionDto.getItemOptionCount() * item.getPrice())
                            .build();

                    cartItem.setCartCount(itemCount);
                    cartItem.setCartPrice(itemPrice);

                    cartItemOptionRepository.save(cartItemOption);
                    cartItemOptionRepository.flush();
                }

                cartItemRepository.save(cartItem);
                cartItemRepository.flush();

                totalPrice += item.getDeliveryFee();
            }

            newCart.setPrice(totalPrice);
            newCart.setCount(totalCount);

            return true;
        }else{

            // 장바구니 총 가격, 개수
            Integer totalPrice = cart.get().getPrice();
            Integer totalCount = cart.get().getCount();

            for(CartItemDto cartItemDto : cartAddReqDto.getCartItemDtoList()){

                Item item = itemRepository.findById(cartItemDto.getItemId())
                        .orElseThrow(() ->  new IllegalArgumentException("아이템을 찾을 수 없습니다."));

                CartItem cartItem = CartItem.builder()
                        .item(item)
                        .cart(cart.get())
                        .build();

                Integer itemPrice = 0;
                Integer itemCount = 0;

                for(CartItemOptionDto cartItemOptionDto : cartItemDto.getItemOptionDtoList()){

                    ItemOption itemOption = itemOptionRepository.findById(cartItemOptionDto.getItemOptionDetailId())
                            .orElseThrow(() -> new IllegalArgumentException("아이템 옵션을 찾이 못했습니다. Item Option Id : " + cartItemOptionDto.getItemOptionId()));

                    totalPrice += itemOption.getItem().getPrice() * cartItemOptionDto.getItemOptionCount();
                    totalCount += cartItemOptionDto.getItemOptionCount();

                    itemCount += cartItemOptionDto.getItemOptionCount();
                    itemPrice +=cartItemOptionDto.getItemOptionCount() * item.getPrice();

                    CartItemOption cartItemOption = CartItemOption.builder()
                            .itemOption(itemOption)
                            .cartItem(cartItem)
                            .cartCount(cartItemOptionDto.getItemOptionCount())
                            .cartPrice(cartItemOptionDto.getItemOptionCount() * item.getPrice())
                            .build();

                    cartItem.setCartCount(itemCount);
                    cartItem.setCartPrice(itemPrice);

                    cartItemOptionRepository.save(cartItemOption);
                }

                cartItemRepository.save(cartItem);

                totalPrice += item.getDeliveryFee();
            }

            cart.get().setPrice(totalPrice);
            cart.get().setCount(totalCount);

            return true;

        }





    }

    @Transactional
    public Boolean updateCartItem(HttpServletRequest request, Long itemId, CartUpdateReqDto cartUpdateReqDto){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        Optional<User> user = userRepository.findByEmail(userEmail);
        Optional<Cart> cart = cartRepository.findByUser(user.get());

        Integer totalCount = cart.get().getCount();
        Integer totalPrice = cart.get().getPrice();

        Optional<CartItem> cartItem = cartItemRepository.findById(itemId);
        List<CartItemOption> cartItemOptionList = cartItemOptionRepository.findByCartItemId(cartItem.get().getId());

        totalPrice -= cartItem.get().getCartPrice();
        totalCount -= cartItem.get().getCartCount();

        Integer itemCount = 0;
        Integer itemPrice = 0;
        for(CartItemOption cartItemOption : cartItemOptionList){
            cartItemOptionRepository.deleteById(cartItemOption.getId());
        }
        for(CartItemOptionDto cartItemOptionDto: cartUpdateReqDto.getItemOptionDtoList()){
            Optional<ItemOption> itemOption = itemOptionRepository.findById(cartItemOptionDto.getItemOptionDetailId());
            totalPrice += cartItem.get().getItem().getPrice() * cartItemOptionDto.getItemOptionCount();
            totalCount += cartItemOptionDto.getItemOptionCount();

            itemPrice += cartItem.get().getItem().getPrice() * cartItemOptionDto.getItemOptionCount();
            itemCount += cartItemOptionDto.getItemOptionCount();

            CartItemOption cartItemOption = CartItemOption.builder()
                    .itemOption(itemOption.get())
                    .cartItem(cartItem.get())
                    .cartCount(cartItemOptionDto.getItemOptionCount())
                    .cartPrice(cartItem.get().getItem().getPrice() * cartItemOptionDto.getItemOptionCount())
                    .build();
            cartItemOptionRepository.save(cartItemOption);
        }
        cartItem.get().setCartCount(itemCount);
        cartItem.get().setCartPrice(itemPrice);
        cart.get().setCount(totalCount);
        cart.get().setPrice(totalPrice);
        return true;
    }

    /**
     * 카트 목록 조회
     */
    public CartListResDto list(HttpServletRequest request){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        Optional<User> user = userRepository.findByEmail(userEmail);
        Optional<Cart> cart = cartRepository.findByUser(user.get());
        List<CartItem> cartItemList = cartItemRepository.findByCartIdItem(cart.get().getId());

        List<CartItemDto> cartItemDtoList = new ArrayList<>();

        for (CartItem cartItem : cartItemList) {

            CartItemDto cartItemDto = CartItemDto.builder()
                    .cartItemId(cartItem.getId())
                    .itemId(cartItem.getItem().getId())
                    .deliveryFee(cartItem.getItem().getDeliveryFee())
                    .thumbnail(cartItem.getItem().getThumbnail())
                    .maximum(cartItem.getItem().getMaximum())
                    .manufact(cartItem.getItem().getManufact())
                    .name(cartItem.getItem().getName())
                    .price(cartItem.getItem().getPrice())
                    .discount(cartItem.getItem().getDiscount())
                    .build();

            List<CartItemOptionDto> cartItemOptionDtoList = new ArrayList<>();

            List<CartItemOption> cartItemOptionList = cartItemOptionRepository.findByCartItemId(cartItem.getId());

            for (CartItemOption cartItemOption:cartItemOptionList) {

                CartItemOptionDto cartItemOptionDto = CartItemOptionDto.builder()
                        .itemOptionDetailId(cartItemOption.getItemOption().getId())
                        .itemOptionId(cartItemOption.getId())
                        .itemOptionName(cartItemOption.getItemOption().getOptionName())
                        .itemOptionCount(cartItemOption.getCartCount())
                        .stock(cartItemOption.getItemOption().getStock())
                        .build();
                cartItemOptionDtoList.add(cartItemOptionDto);
            }

            cartItemDto.setItemOptionDtoList(cartItemOptionDtoList);

            cartItemDtoList.add(cartItemDto);


        }

        return CartListResDto.builder()
                .price(cart.get().getPrice())
                .count(cart.get().getCount())
                .cartItemDtoList(cartItemDtoList)
                .build();
    }

    /**
     * 카트 삭제
     */

    @Transactional
    public Boolean deleteCart(HttpServletRequest request, Long cartItemId){

       List<CartItemOption> cartItemOptionList = cartItemOptionRepository.findAllByCartAndUser(cartItemId);

       for(CartItemOption cartItemOption:cartItemOptionList){
           cartItemOptionRepository.deleteById(cartItemOption.getId());
       }

        cartItemRepository.deleteById(cartItemId);

        return true;
    }
}
