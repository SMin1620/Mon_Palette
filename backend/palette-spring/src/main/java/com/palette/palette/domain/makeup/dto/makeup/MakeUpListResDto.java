package com.palette.palette.domain.makeup.dto.makeup;

import com.palette.palette.domain.makeup.entity.MakeUpImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MakeUpListResDto {

    private Long id;

    private String makeUp;

    private String sampleMakeUpImage;


    public static MakeUpListResDto toDto(MakeUpImage makeUpImage) {

        return MakeUpListResDto.builder()
                .id(makeUpImage.getId())
                .makeUp(makeUpImage.getMakeUp().getName())
                .sampleMakeUpImage(makeUpImage.getImagePath())
                .build();
    }
}
