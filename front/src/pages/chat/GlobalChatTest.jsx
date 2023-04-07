import { useEffect, useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import request from "../../utils/request"

// { type = seller : customer }
export const SellerChat = () => {
    const { user } = useSelector((state) => state.user)

    const getCustomerList = async () => {
        const response = await request.get(`/chats/customers?seller=${user.email}`)

    }

    const getSellerList = async () => {
        const response = await request.get(`/chats/sellers?customer=${user.email}`)
    }
    
    useEffect(() => {

    }, [])

    return (
        <>

        </>
    )
}