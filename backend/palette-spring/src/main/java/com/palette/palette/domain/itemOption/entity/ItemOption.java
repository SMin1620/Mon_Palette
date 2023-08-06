package com.palette.palette.domain.itemOption.entity;


import com.palette.palette.domain.item.dto.ItemOptionAddReqDto;
import com.palette.palette.domain.item.entity.Item;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
//@SQLDelete(sql = "UPDATE item_options SET is_delete = true, delete_at = CURRENT_TIMESTAMP WHERE item_option_id = ?")  // delete 쿼리가 발생하면 해당 쿼리가 대신 실행.
//@Where(clause = "is_delete = false") // select 쿼리가 발생할 때, 디폴트 값으로 추가되어서 쿼리가 실행.
@Entity
@Table(name = "item_options")
public class ItemOption {

    @Id
    @GeneratedValue
    @Column(name = "option_id")
    private Long id;

    @Column(name = "option_name", nullable = false)
    private String optionName;

    @Column(nullable = false)
    private Integer stock = 0;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "item_id")
    private Item item;

    public static ItemOption toEntity(ItemOptionAddReqDto itemOptionAddReqDto, Item item){
        return ItemOption.builder()
                .item(item)
                .optionName(itemOptionAddReqDto.getOptionName())
                .stock(itemOptionAddReqDto.getStock())
                .build();
    }

}
