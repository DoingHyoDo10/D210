package org.ssafy.d210.members.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Struct;
import org.ssafy.d210._common.entity.BaseTime;
import org.ssafy.d210.wallets.entity.BlockAddress;
import org.ssafy.d210.wallets.entity.MemberAccount;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Table(name = "members") // 테이블 명이 entity랑 다를 때만 작성하면 됩니다.
@Getter
@Setter
// soft delete 구현
@SQLDelete(sql = "UPDATE members set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') WHERE id = ?")
public class Members extends BaseTime {

    public enum GenderType {
        MALE, FEMALE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment 설정
    @Column(name = "member_id")  // 필드명이 entity 와 다를 경우에만 설정
    private Long id;

    @Column(name = "member_email")
    private String email;

    @ManyToOne
    @JoinColumn(name = "member_account_id")
    private MemberAccount memberAccountId;

    @Column(name = "nickname", nullable = false, length = 15)
    private String nickname;

    @Column(name = "profile_url", nullable = false, length = 500)
    private String profileUrl;

    @Enumerated(EnumType.STRING)
    @Column
    private Role role;

    @Column(name = "main_badge", length = 100)
    private String mainBadge;

    @Column(name = "gender")
    private GenderType gender;

    @Column(name = "height")
    private Long height;

    @Column(name = "weight")
    private Long weight;

    @Column(name = "location", length = 500)
    private String location;

    @Column(name = "birth_year")
    private Long birthYear;

    @Column(name = "longitude")
    private double longitude;

    @Column(name = "latitude")
    private double latitude;

    @Column(name = "is_new")
    private boolean isNew;

    @Column(name = "streak_color", length = 20)
    private String streakColor;

    @Column(name = "comment", length = 50)
    private String comment;

    @Column(name = "phone_number", length = 15)
    private String phoneNumber;

    @Column(name = "daily_criteria")
    private Long dailyCriteria;

    @OneToMany(mappedBy = "members", cascade = CascadeType.REMOVE)
    private List<BlockAddress> blockAddresses = new ArrayList<>();


    @Builder
    public Members(
            String email, String nickname, String profileUrl, Role role,
            GenderType gender, Long height, Long weight, String location,
            Long birthYear, double longitude, double latitude, boolean isNew,
            String streakColor, String comment, String phoneNumber, Long dailyCriteria

    ){
        this.email = email;
        this.nickname = nickname;
        this.profileUrl = profileUrl;
        this.role = role;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.location = location;
        this.birthYear = birthYear;
        this.longitude = longitude;
        this.latitude = latitude;
        this.isNew = isNew;
        this.streakColor = streakColor;
        this.comment = comment;
        this.phoneNumber = phoneNumber;
        this.dailyCriteria = dailyCriteria;
    }

    public static Members of(String email, String nickname, String profileUrl, Role role){
        return builder()
                .email(email)
                .nickname(nickname)
                .profileUrl(profileUrl)
                .role(role)
                .build();
    }




    public static Members of(
            String email, String nickname, String profileUrl, Role role,
            GenderType gender, Long height, Long weight, String location,
            Long birthYear, double longitude, double latitude, boolean isNew,
            String streakColor, String comment, String phoneNumber, Long dailyCriteria
    ) {

        return builder()
                .email(email)
                .nickname(nickname)
                .profileUrl(profileUrl)
                .role(role)
                .gender(gender)
                .height(height)
                .weight(weight)
                .location(location)
                .birthYear(birthYear)
                .longitude(longitude)
                .latitude(latitude)
                .isNew(isNew)
                .streakColor(streakColor)
                .comment(comment)
                .phoneNumber(phoneNumber)
                .dailyCriteria(dailyCriteria)
                .build();

    }

    public Members update (String nickname, String profileUrl) {
        this.nickname = nickname;
        this.profileUrl = profileUrl;

        return this;
    }

    public String getRoleKey() {
        return role.getKey();
    }

}
