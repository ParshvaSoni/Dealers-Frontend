import React, { useContext, useState } from 'react'

type Props = {
    children?: React.ReactNode;
};

type DealersProps = {
    DealersData?: {
        address?: {
            addressLine?: string,
            city?: string,
            pincode?: string,
            state?: string,
        }
        footerPhotoUrl?: string,
        gstnumber?: string,
        headerPhotoUrl?: string,
        profilePicUrl?: string,
        shopname?: string,
        tagline?: string
    }
}

type DealerContextProps = {
    dealer: DealersProps,
    setDealer: React.Dispatch<React.SetStateAction<DealersProps>>
}

const DealerDataContext = React.createContext({} as DealerContextProps)

export function useDealersData() {
    return useContext(DealerDataContext);
}

const DealersContext = ({ children }: Props) => {
    const [dealer, setDealer] = useState({ DealersData: JSON.parse(localStorage.getItem('dealersinfo') || '{}') || {} } as DealersProps)
    console.log(dealer);
    return (
        <DealerDataContext.Provider value={{ dealer, setDealer }}>
            {children}
        </DealerDataContext.Provider>
    )
}

export default DealersContext;