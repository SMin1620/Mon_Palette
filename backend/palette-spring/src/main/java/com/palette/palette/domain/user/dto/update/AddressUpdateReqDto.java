package com.palette.palette.domain.user.dto.update;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddressUpdateReqDto {

    @Schema(description = "주소지", example = "부산 강서구")
    private String address;
}
