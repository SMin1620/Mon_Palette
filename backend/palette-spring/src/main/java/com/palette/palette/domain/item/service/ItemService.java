package com.palette.palette.domain.item.service;

import com.palette.palette.domain.category.entity.Category;
import com.palette.palette.domain.category.repository.CategoryRepository;
import com.palette.palette.domain.categoryitemlist.entity.CategoryProductList;
import com.palette.palette.domain.categoryitemlist.repository.CategoryProductListRepository;
import com.palette.palette.domain.item.dto.*;
import com.palette.palette.domain.item.entity.Item;
import com.palette.palette.domain.item.repository.ItemRepository;
import com.palette.palette.domain.itemDetailPhoto.dto.ItemDetailPhotoDto;
import com.palette.palette.domain.itemDetailPhoto.entity.ItemDetailPhoto;
import com.palette.palette.domain.itemDetailPhoto.repository.ItemDetailPhotoRepository;
import com.palette.palette.domain.itemOption.dto.ItemOptionDto;
import com.palette.palette.domain.itemOption.entity.ItemOption;
import com.palette.palette.domain.itemOption.repository.ItemOptionRepository;
import com.palette.palette.domain.itemPhoto.dto.ItemPhotoDto;
import com.palette.palette.domain.itemPhoto.entity.ItemPhoto;
import com.palette.palette.domain.itemPhoto.repository.ItemPhotoRepository;
import com.palette.palette.domain.user.dto.UserDto;
import com.palette.palette.domain.user.entity.Role;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class ItemService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ItemRepository itemRepository;
    private final ItemDetailPhotoRepository itemDetailPhotoRepository;
    private final ItemOptionRepository itemOptionRepository;
    private final ItemPhotoRepository itemPhotoRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryProductListRepository categoryProductListRepository;

    @Transactional
    public Boolean registItem(HttpServletRequest request, ItemAddReqDto itemAddReqDto){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        Optional<User> user = userRepository.findByEmail(userEmail);
        if(user.get().getRole() == Role.USER) throw new IllegalArgumentException("권한이 없습니다.");
        Item item = Item.toEntity(itemAddReqDto, user.get());
        itemRepository.save(item);

        Optional<Category> category = categoryRepository.findById(itemAddReqDto.getCategoryParentId());
        Category itemCategory = Category.toEntity(itemAddReqDto.getCategoryName(), category.get());
        categoryRepository.save(itemCategory);

        categoryProductListRepository.save(CategoryProductList.toEntity(itemCategory, item));

        List<ItemOption> itemOptionList = new ArrayList<>();
        for(ItemOptionAddReqDto iard : itemAddReqDto.getItemOptionList()){
            ItemOption itemOption = ItemOption.toEntity(iard, item);
            itemOptionList.add(itemOption);
        }
        itemOptionRepository.saveAll(itemOptionList);

        List<ItemDetailPhoto> itemDetailPhotoList = new ArrayList<>();
        for(String s : itemAddReqDto.getItemDetailImageList()){
            ItemDetailPhoto itemDetailPhoto = ItemDetailPhoto.toEntity(s, item);
            itemDetailPhotoList.add(itemDetailPhoto);
        }
        itemDetailPhotoRepository.saveAll(itemDetailPhotoList);

        List<ItemPhoto> itemPhotoList = new ArrayList<>();
        for(String s : itemAddReqDto.getItemPhotoList()){
            ItemPhoto itemPhoto = ItemPhoto.toEntity(s, item);
            itemPhotoList.add(itemPhoto);
        }
        itemPhotoRepository.saveAll(itemPhotoList);

        return true;
    }

    public List<ItemGetResDto> getItem(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        List<ItemGetResDto> items = itemRepository.findAllOrderByEndAtAsc(pageable)
                .getContent()
                .stream()
                .map(ItemGetResDto::toDto)
                .collect(Collectors.toList());
        return items;
    }

    @Transactional
    public Boolean updateItem(HttpServletRequest request, Long id, ItemUpdateReqDto itemUpdateReqDto){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        Optional<User> user = userRepository.findByEmail(userEmail);
        if(user.get().getRole() == Role.USER) throw new IllegalArgumentException("권한이 없습니다.");

        Optional<Item> item = itemRepository.findById(id);
        if(item.get().getUser() != user.get()){
            throw new IllegalArgumentException("작성자가 아닙니다");
        }
        item.get().updateItem(itemUpdateReqDto);
        return true;
    }

    @Transactional
    public Boolean deleteItem(HttpServletRequest request, Long id){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        Optional<User> user = userRepository.findByEmail(userEmail);
        Optional<Item> item = itemRepository.findById(id);
        if(user.get() != item.get().getUser()){
            throw new IllegalArgumentException("권한이 없습니다.");
        }
        itemRepository.deleteById(id);
        return true;
    }

    public ItemDetailResDto detailItem(HttpServletRequest req, Long id){
        Optional<Item> item = itemRepository.findById(id);
        List<ItemOptionDto> itemOptionDtoList = itemOptionRepository.findByItem(item.get())
                .stream()
                .map(ItemOptionDto::toDto)
                .collect(Collectors.toList());
        List<ItemPhotoDto> itemPhotoDtoList = itemPhotoRepository.findByItem(item.get())
                .stream()
                .map(ItemPhotoDto::toDto)
                .collect(Collectors.toList());
        List<ItemDetailPhotoDto> itemDetailPhotoDtoList = itemDetailPhotoRepository.findByItem(item.get())
                .stream()
                .map(ItemDetailPhotoDto::toDto)
                .collect(Collectors.toList());
        UserDto userDto = UserDto.toDto(item.get().getUser());
        ItemDetailResDto itemDetailResDto = ItemDetailResDto.toDto(item.get(), userDto, itemOptionDtoList, itemPhotoDtoList, itemDetailPhotoDtoList);
        return itemDetailResDto;
    }

    public List<ItemGetResDto> getCategoryItem(Long categoryid){
        Optional<Category> category = categoryRepository.findById(categoryid);
        List<ItemGetResDto>  itemGetResDtoList = categoryProductListRepository.findByCategory(category.get())
                .stream()
                .map(ItemGetResDto::toCDto)
                .collect(Collectors.toList());
        return itemGetResDtoList;
    }

}
