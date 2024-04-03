package org.ssafy.d210.friends.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.d210._common.exception.CustomException;
import org.ssafy.d210._common.exception.ErrorType;
import org.ssafy.d210.friends.dto.FriendReceivedDto;
import org.ssafy.d210.friends.dto.FriendSentDto;
import org.ssafy.d210.friends.dto.GalleyMemberListDto;
import org.ssafy.d210.friends.dto.MemberListDto;
import org.ssafy.d210.friends.dto.request.PostSearchMemberListRequest;
import org.ssafy.d210.friends.dto.response.GetFriendListResponse;
import org.ssafy.d210.friends.dto.request.PostFriendRequest;
import org.ssafy.d210.friends.dto.request.PutFriendRequest;
import org.ssafy.d210.friends.dto.response.GetMemberInfoResponse;
import org.ssafy.d210.friends.dto.response.PutFriendResponse;
import org.ssafy.d210.friends.entity.FriendList;
import org.ssafy.d210.friends.repository.FriendListRepository;
import org.ssafy.d210.members.entity.Members;
import org.ssafy.d210.members.repository.MembersRepository;
import org.ssafy.d210.notifications.entity.NotiType;
import org.ssafy.d210.notifications.entity.Notification;
import org.ssafy.d210.notifications.service.NotificationService;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendService {
    private final FriendListRepository friendListRepository;
    private final MembersRepository membersRepository;
    private final NotificationService notificationService;

    public GetMemberInfoResponse getMemberInfo(Members member, Long memberId){
        Members members = membersRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_MEMBER));

        FriendList friendList = friendListRepository.findFriendListBySenderIdAndReceiverIdAndIsFriendIsTrue(member, members)
                .orElseThrow(()->new CustomException(ErrorType.NOT_FOUND_FRIEND));

        boolean isFriend = friendList.getIsFriend();
        return GetMemberInfoResponse.from(members, isFriend);
    }

    public List<GetFriendListResponse> getMemberList(Members member){
        List<FriendList> friendList = friendListRepository.findFriendListsBySenderIdAndIsFriendIsTrue(member)
                .orElseThrow(()->new CustomException(ErrorType.NOT_FOUND_FRIEND));

        return friendList.stream().map(GetFriendListResponse::from).collect(Collectors.toList());
    }

    @Transactional
    public String postFriend(Members member, PostFriendRequest request){
        Members receiver = membersRepository.findById(request.getMemberId())
                .orElseThrow(()->new CustomException(ErrorType.NOT_FOUND_MEMBER));

        FriendList friendList = friendListRepository.findFriendListBySenderIdAndReceiverId(member, receiver).orElse(null);

        if(friendList == null) {
            friendListRepository.save(
                    FriendList.builder()
                            .senderId(member)
                            .receiverId(receiver)
                            .isAccepted(true)
                            .isFriend(false)
                            .build()
            );
            friendListRepository.save(
                    FriendList.builder()
                            .senderId(receiver)
                            .receiverId(member)
                            .isAccepted(false)
                            .isFriend(false)
                            .build()
            );
            Notification notification = Notification.builder()
                    .senderId(member)
                    .receiverId(receiver)
                    .isChecked(false)
                    .notiType(NotiType.FRIEND)
                    .notiContent("친구 요청이 왔습니다.")
                    .build();
            notificationService.insertNotification(notification);
            notificationService.notify(receiver.getId(), notification);
        }
        else{
            throw new CustomException(ErrorType.ALREADY_SEND_FRIEND_REQUEST);
        }
        return "";
    }

    public List<FriendSentDto> getSentList(Members member){
        return friendListRepository.findFriendListsBySenderIdAndIsAcceptedIsTrueAndIsFriendIsFalse(member)
                .orElseThrow(()->new CustomException(ErrorType.NOT_FOUND_FRIEND))
                .stream().map(FriendSentDto::from).toList();
    }

    public List<FriendReceivedDto> getReceivedList(Members member){
        return friendListRepository.findFriendListsByReceiverIdAndIsAcceptedIsTrueAndIsFriendIsFalse(member)
                .orElseThrow(()->new CustomException(ErrorType.NOT_FOUND_FRIEND))
                .stream().map(FriendReceivedDto::from).toList();
    }

    @Transactional
    public PutFriendResponse putFriend(Members member, PutFriendRequest request){
        Members friend = membersRepository.findById(request.getMemberId()).orElse(null);
        Boolean isAccepted = request.getIsAccept();

        FriendList friendList1 = friendListRepository.findFriendListBySenderIdAndReceiverId(member, friend)
                .orElseThrow(()->new CustomException(ErrorType.NOT_FOUND_FRIEND));

        FriendList friendList2 = friendListRepository.findFriendListBySenderIdAndReceiverId(friend, member)
                .orElseThrow(()->new CustomException(ErrorType.NOT_FOUND_FRIEND));

        if(isAccepted) {
            friendList1.updateIsAccepted(isAccepted);
            friendList1.updateIsFriend(isAccepted);
            friendList2.updateIsFriend(isAccepted);

            friendListRepository.save(friendList1);
            friendListRepository.save(friendList2);
        }
        else{
            friendListRepository.delete(friendList1);
            friendListRepository.delete(friendList2);
        }

        return PutFriendResponse.builder()
                .isFriend(isAccepted)
                .build();
    }

    public List<MemberListDto> getSearchedMemberList(Members member, PostSearchMemberListRequest request){
        return friendListRepository.findAllByKeyword(member.getId(), request.getKeyword());
    }

    public List<GalleyMemberListDto> getSearchedGalleyMemberList(Members member, PostSearchMemberListRequest request){
        return friendListRepository.findMembersById(member.getId(), request.getKeyword());
    }
}
