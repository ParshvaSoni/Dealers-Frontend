import React,{useState,useEffect} from 'react';
import OfferForm from './OfferForm';
import Loading from '../../Components/Loading'
import { useParams } from 'react-router-dom';
import { useGetAllOffersQuery,useUpdateOfferMutation } from './OfferSlice';
import { OpenNotification } from '../../HelperFunction';


const UpdateOffer = () => {
    const {id} = useParams();
    const [updateData,setUpdateData] = useState({});
    const [validID,setValidID] = useState(true);
    const { data:G_data,
            isLoading:G_isLoading,
            isError:G_isError,
            isFetching:G_isFetching,
            isSuccess:G_isSuccess,
            error:G_Error
        } = useGetAllOffersQuery('Offer');

    const [ UseUpdateOffer,
            {
                isLoading:U_isLoading,
                isError:U_isError,
                isSuccess:U_isSuccess,
                error:U_Error
            }
        ] = useUpdateOfferMutation();

    useEffect(()=>{
        const temp=G_data?.data.entities[id||''];
        if(temp?._id===id)
        {
            setUpdateData({...temp});
            setValidID(true);
        }
        else
        {
            setValidID(false);
        }
    },[G_data]);

    if(G_isFetching || G_isLoading || U_isLoading)
    {
        return <Loading />
    }
    if(validID)
    {
        return (
            <div>
                <pre>{JSON.stringify(updateData, null, 2)}</pre>
            </div>
        )
    }
    else
    {
        return (
            <p>Something went wrong, we didn't find offer ID you are looking for. Plz refresh the page or contact developers !</p>
        )
    }
}

export default UpdateOffer