import request from '../../utils/request'

export const CommunityView = () => {
    const getData = async () => {
        try {
            const boardId = window.location.pathname.split('/community/')[1]
            console.log(boardId)
            console.log('sdadaskljfglkajlkadjfal')
            const response = await request(`/community/${boardId}`)
            // console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    getData()

    return (
        <div>
            <h2></h2>
        </div>
    )
}
