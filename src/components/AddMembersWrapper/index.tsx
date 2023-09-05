import { CometChat } from "@cometchat/chat-sdk-javascript";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CometChatAddMembers } from "@cometchat/chat-uikit-react";

type AddMembersWrapperProps = { setSomeInterestingAsyncOpStarted : React.Dispatch<React.SetStateAction<boolean>> };

export function AddMembersWrapper(props : AddMembersWrapperProps) {
    const [group, setGroup] = useState<CometChat.Group>();
    const navigate = useNavigate();
    const { setSomeInterestingAsyncOpStarted, ...otherProps } = props;

    useEffect(() => {
        (async () => {
            const groupsRequest = new CometChat.GroupsRequestBuilder().setLimit(1).build();
            try {
                setSomeInterestingAsyncOpStarted(true);
                const [fetchedGroup] = await groupsRequest.fetchNext();
                setGroup(fetchedGroup);
            }
            catch(error) {
                console.log(error);
            }
            finally {
                setSomeInterestingAsyncOpStarted(false);
            }
        })();
    }, [setSomeInterestingAsyncOpStarted]);

    if (!group) {
        return null;
    }

    return (
        <CometChatAddMembers
            group = {group}
            onBack = {() => navigate(-1)}
            onClose = {() => navigate("/home/groups-module")}
            {...otherProps}
        />
    );
}
