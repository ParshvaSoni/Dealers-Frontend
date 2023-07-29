import { apiSlice } from "../../Features/api/apiSlice";

type OfferResponse={
    success:0|1;
    message:string;
    data:Offer[];
}

type Offer = {
    _id: string;
    title: string;
    description: string;
    imageurl: string[];
    targetlink: string;
    startdate: string;
    enddate: string;
    createdAt?: string;
    updatedAt?: string;
}

export type TransformedOffer={
    success:0|1;
    message:string;
    data:{
        ids:string[];
        entities:{
            [key:string] : Offer;
        }
    }
}


export const extendedOfferSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOffers: builder.query({
            query: () => ('/Offers'),
            providesTags: ['Offer'],
            transformResponse: (responseData:OfferResponse) => {
                let transformedRes:TransformedOffer={success:responseData.success,message:responseData.message,data:{ids:[],entities:{}}};
                responseData.data.forEach((item)=>{
                    transformedRes.data.ids.push(item._id);
                    transformedRes.data.entities[item._id]=item;
                })
                return transformedRes;
            }
        }),
        createOffer: builder.mutation({
            query: (request) => ({
                url: '/offers',
                method: 'POST',
                body: request
            }),
            invalidatesTags: ['Offer']
        }),
        updateOffer: builder.mutation({
            query: ({ _id, ...rest }) => ({
                url: `/offer/${_id}`,
                method: 'PUT',
                body: rest
            }),
            invalidatesTags: ['Offer']
        }),
        deleteOffer: builder.mutation({
            query: (request) => ({
                url: `/offer/${request._id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Offer']
        })
    })
});

export const { useCreateOfferMutation, useGetAllOffersQuery, useDeleteOfferMutation, useUpdateOfferMutation } = extendedOfferSlice;
