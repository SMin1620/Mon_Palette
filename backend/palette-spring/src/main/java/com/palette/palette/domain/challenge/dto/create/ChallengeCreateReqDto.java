package com.palette.palette.domain.challenge.dto.create;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeCreateReqDto {
    
    @NotEmpty(message = "동영상이 필요합니다.")
    @Schema(description = "동영상 url", example = "asdwad/awdacs.mp4")
    private String video;

    @NotEmpty(message = "썸네일이 필요합니다.")
    @Schema(description = "동영상 썸네일", example = "asdwad/awdacs.jpg")
    private String thumbnail;

    @NotEmpty(message = "내용이 필요합니다.")
    @Schema(description = "챌린지 내용", example = "챌린지 내용")
    private String content;
    
}
