package com.palette.palette.domain.color.dto.makeup;

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

    private String color;

    private List<String> colorExample;

}
