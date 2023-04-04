import { useDispatch, useSelector } from "react-redux";


export const Chat = ({ opponent }) => {
    const { user } = useSelector((state) => state.user);
    console.log(`sender:::`, user, `writer(receiver):::`, opponent)

    return <>채팅</>
}