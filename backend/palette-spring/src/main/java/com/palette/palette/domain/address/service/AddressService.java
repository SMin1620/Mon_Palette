package com.palette.palette.domain.address.service;

import com.palette.palette.domain.address.dto.AddressReqDto;
import com.palette.palette.domain.address.dto.AddressResDto;
import com.palette.palette.domain.address.entity.Address;
import com.palette.palette.domain.address.repository.AddressRepository;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class AddressService {

    private final JwtTokenProvider jwtTokenProvider;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;


    /**
     * 배송지 추가
     */
    @Transactional
    public Boolean addAddress(HttpServletRequest req, AddressReqDto addressReqDto){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(req));
        Optional<User> user = userRepository.findByEmail(userEmail);
        Optional<Address> address = addressRepository.findByUserAndIsMain(user.get().getId(), 1);
        if(addressReqDto.getIsMain() == 1 && !address.isEmpty()){
            address.get().updateIsMain(0);
        }
        addressRepository.save(Address.toEntity(user.get(), addressReqDto));
        return true;
    }

    /**
     * 배송지 목록 조회
     */
    public List<AddressResDto> getAddress(HttpServletRequest req){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(req));
        Optional<User> user = userRepository.findByEmail(userEmail);
        List<AddressResDto> addressList = addressRepository.findByUserId(user.get().getId())
                .stream()
                .map(AddressResDto::toDto)
                .collect(Collectors.toList());
        return addressList;
    }

    /**
     * 배송지 수정
     */
    @Transactional
    public Boolean updateAddress(HttpServletRequest req, AddressReqDto addressReqDto, Long addressId){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(req));
        Optional<User> user = userRepository.findByEmail(userEmail);
        Optional<Address> address = addressRepository.findByUserAndIsMain(user.get().getId(), 1);
        if(addressReqDto.getIsMain() == 1 && !address.isEmpty()){
            address.get().updateIsMain(0);
        }
        Optional<Address> oldAddress = addressRepository.findById(addressId);
        oldAddress.get().updateAddress(addressReqDto);
        return true;
    }

    /**
     * 배송지 삭제
     */
    @Transactional
    public Boolean deleteAddress(Long addressId){
        addressRepository.deleteById(addressId);
        return true;
    }





}
