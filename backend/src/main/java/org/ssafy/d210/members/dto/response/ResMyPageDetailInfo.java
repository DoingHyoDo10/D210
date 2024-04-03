package org.ssafy.d210.members.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.ssafy.d210.members.entity.Members;
import org.ssafy.d210.wallets.entity.MemberAccount;

@Getter
@Setter
public class ResMyPageDetailInfo {


    String profileUrl;

    String nickname;

    Long birthYear;

    double height;

    double weight;

    String gender;

    String location;

    double longitude;

    double latitude;

    String comment;

    Long dailyCriteria;

    String phoneNumber;

    String eoa;

    @Builder
    public ResMyPageDetailInfo(String profileUrl, String nickname, Long birthYear, double height, double weight, String gender, String location, double longitude, double latitude, String comment, Long dailyCriteria, String phoneNumber, String eoa) {
        this.profileUrl = profileUrl;
        this.nickname = nickname;
        this.birthYear = birthYear;
        this.height = height;
        this.weight = weight;
        this.gender = gender;
        this.location = location;
        this.longitude = longitude;
        this.latitude = latitude;
        this.comment = comment;
        this.dailyCriteria = dailyCriteria;
        this.phoneNumber = phoneNumber;
        this.eoa = eoa;
    }

    public static ResMyPageDetailInfo of (Members me) {
        return builder()
                .profileUrl(me.getProfileUrl())
                .nickname(me.getNickname())
                .birthYear(me.getBirthYear())
                .height(me.getHeight())
                .weight(me.getWeight())
                .gender(me.getGender().equals(Members.GenderType.MALE)? "MALE" : "FEMALE")
                .location(me.getLocation())
                .longitude(me.getLongitude())
                .latitude(me.getLatitude())
                .comment(me.getComment())
                .dailyCriteria(me.getDailyCriteria())
                .phoneNumber(me.getPhoneNumber())
                .eoa(me.getMemberAccountId().getEoa())
                .build();
    }
}
