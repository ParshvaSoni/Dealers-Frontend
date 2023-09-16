import React from 'react';
import styled from 'styled-components';
import { useDealersData } from '../Context/DealersContext';
import { useAuth } from '../Context/AuthContext';



interface PropsData {
    _id: string,
    customername: string,
    customermobile: string,
    productname: string,
    metaltype: string,
    metalpurity: string,
    metalweight: number,
    rate: number,
    labour: number,
    extra: number,
    message: string,
    deliverdate: string,
    imageurl: string,
    huid: string,
    transaction: {
        amount: number,
        transactiondate: string,
        _id: string
    }[]
}

interface PrintLayoutProps {
    data: PropsData
}

function round(n: number) {
    return n + (10 - n % 10);
}

function calc(gram: number, rate: number, labour: number, extra: number) {
    // gram = parseFloat(gram);
    // labour = parseFloat(labour);
    // rate = parseFloat(rate);
    // extra = parseFloat(extra);
    let amount = ((gram * (rate + labour)) + extra);
    return round(amount + amount * 0.03);
}


function titleCase(str: string) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}

function inWords(num: string): string {
    const a: string[] = [
        '',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten',
        'eleven',
        'twelve',
        'thirteen',
        'fourteen',
        'fifteen',
        'sixteen',
        'seventeen',
        'eighteen',
        'nineteen'
    ];

    const b: string[] = [
        '',
        '',
        'twenty',
        'thirty',
        'forty',
        'fifty',
        'sixty',
        'seventy',
        'eighty',
        'ninety'
    ];

    if ((num = num.toString()).length > 9) return 'overflow';
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return '';

    let str = '';
    str += n[1] !== '00' ? (a[Number(n[1])] || b[Number(n[1][0])] + ' ' + a[Number(n[1][1])]) + ' crore ' : '';
    str += n[2] !== '00' ? (a[Number(n[2])] || b[Number(n[2][0])] + ' ' + a[Number(n[2][1])]) + ' lakh ' : '';
    str += n[3] !== '00' ? (a[Number(n[3])] || b[Number(n[3][0])] + ' ' + a[Number(n[3][1])]) + ' thousand ' : '';
    str += n[4] !== '0' ? (a[Number(n[4])] || b[Number(n[4][0])] + ' ' + a[Number(n[4][1])]) + ' hundred ' : '';
    str += n[5] !== '00' ? ((str !== '' ? 'and ' : '') + (a[Number(n[5])] || b[Number(n[5][0])] + ' ' + a[Number(n[5][1])]) + ' only ') : '';

    return str.trim();
}

const PrintBillLayout: React.FC<PrintLayoutProps> = ({ data }) => {
    const { dealer } = useDealersData();
    console.log(data);
    const { User } = useAuth();
    console.log("component to print props :", data.rate);
    let purchaseprice = calc(data.metalweight, data.rate, 1000, 100);
    let ReceviedAmt = data?.transaction.reduce(function (total: number, curr) { return total + curr.amount }, 0);
    return (
        <Bill_Container>
            <div className='container'>
                <header className="header" style={{border:'1px solid red'}}>
                    {dealer.DealersData?.headerPhotoUrl ? <img src={`${dealer.DealersData?.headerPhotoUrl}`} alt="Image to Print" width={"100%"} height={"150px"} loading={'lazy'} /> : <></>}
                </header>

                <main className='content'>
                    <div style={{ display: 'flex', borderBottom: '1px solid black', justifyContent: 'space-between', padding: '0px 12px', paddingTop: '5px' }}>
                        <div style={{ width: '20%', }}>
                            <h2>Invoice</h2>
                        </div>
                        <div style={{ width: '80%', textAlign: 'end' }}>
                            <h3 className='truncate'>Date & Time : {Date().toString().split('GMT')[0]}</h3>
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', padding: '12px 12px' }}>
                            <div style={{ width: '60%' }}>
                                <h3>Dealer Details : </h3>
                                <p>{titleCase(dealer.DealersData?.shopname || 'Dealers Shop Name')}</p>
                                <p className='truncate'>{titleCase(dealer.DealersData?.address?.addressLine || 'Dealers Address Line')}</p>
                                <p className='truncate'>{titleCase((dealer.DealersData?.address?.city || 'city') + ', ' + (dealer.DealersData?.address?.state || 'state') + " - " + (dealer.DealersData?.address?.pincode || 'pincode'))}</p>
                            </div>
                            <div style={{ width: '40%' }}>
                                <h3>Customer Details : </h3>
                                <p>Customer Name : {titleCase(data?.customername || '')}</p>
                                <p>Customer Phone : {data?.customermobile || "9999999999"}</p>
                                <p>Invoice Id: {data?._id || "634214512142251254"}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '12px 12px' }}>
                            {/* <div>Gold 24KT : {data?.metal=='gold'?(data?.data?.metalpurity=='24KT'?(data?.data?.rate):(rates.gold_24)):(rates.gold_24) || rates?.gold_24}</div> */}
                            <div>Standards Rates </div>
                            <div>Gold 24KT : {"5000"}</div>
                            <div>Gold 22KT : {"4000"}</div>
                            <div>Gold 18KT : {"5000"}</div>
                            <div>Silver : {"45000"}</div>
                            <div>Labour : {"500"}</div>
                        </div>
                    </div>
                    <div style={{ height: 'max-content', padding: '0px 12px' }}>
                        <table style={{ borderCollapse: "collapse", width: "100%" }}>
                            <tr>
                                <th style={{ border: '1px solid black', padding: "8px" }}>Product Name</th>
                                <th style={{ border: '1px solid black', padding: "8px" }}>Metal</th>
                                <th style={{ border: '1px solid black', padding: "8px" }}>Metal Purity</th>
                                <th style={{ border: '1px solid black', padding: "8px" }}>Product Weight</th>
                                <th style={{ border: '1px solid black', padding: "8px" }}>Rate</th>
                                <th style={{ border: '1px solid black', padding: "8px" }}>Labour</th>
                                <th style={{ border: '1px solid black', padding: "8px" }}>Extra</th>
                                <th style={{ border: '1px solid black', padding: "8px" }}>ProductPrice Inc. GST</th>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: "8px" }}>{titleCase(data?.productname || '')}</td>
                                <td style={{ border: '1px solid black', padding: "8px" }}>{titleCase(data?.metaltype || '')}</td>
                                <td style={{ border: '1px solid black', padding: "8px" }}>{data?.metalpurity}</td>
                                <td style={{ border: '1px solid black', padding: "8px" }}>{data?.metalweight}</td>
                                <td style={{ border: '1px solid black', padding: "8px" }}>{data?.rate}</td>
                                <td style={{ border: '1px solid black', padding: "8px" }}>{data?.labour}</td>
                                <td style={{ border: '1px solid black', padding: "8px" }}>{data?.extra}</td>
                                <td style={{ border: '1px solid black', padding: "8px" }}>{purchaseprice}</td>
                            </tr>
                        </table>
                        <p style={{ textAlign: 'center' }}>{titleCase(data?.message || 'Thanks For Trusting And Buying From Us.')}</p>
                    </div>
                    <div style={{ display: 'flex', flex: 1 }}>
                        {/* <div style={{ backgroundImage: `url('${`https://www.kalyanjewellers.net/images/Jewellery/Gold/images/kajjara-nimah-gold-jhumka.jpg`}')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'contain', width: '100%', height: '300px',border:'1px solid red' }}></div> */}
                        {(sessionStorage.getItem('UserCaptureImage') != null || data?.imageurl != null) ?
                            <div style={{ width: '50%', height: '300px' }}>
                                <img src={data.imageurl || sessionStorage.getItem('UserCaptureImage') || ''} alt="Image to Print" width={"100%"} height={"100%"} loading={'lazy'} />s
                            </div>
                            :
                            <></>}
                        <div style={{ height: '100%', width: '100%', padding: '12px' }}>
                            <h3 style={{ textAlign: 'center' }}>Transaction Details</h3>
                            <table style={{ borderCollapse: 'collapse', width: "100%" }}>
                                <tr>
                                    <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
                                    <th style={{ border: '1px solid black', padding: '8px' }}>Amount</th>
                                </tr>
                                {data?.transaction.map((item) => {
                                    return <tr><td style={{ border: '1px solid black', padding: '8px' }}>{new Date(item.transactiondate).toString().split('GMT')[0]}</td><td style={{ border: '1px solid black', padding: '8px' }}>{item.amount}</td></tr>
                                })}
                            </table>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flex: '1' }}>
                                <div><b>Recevied Amt. Total :</b> {ReceviedAmt}</div>
                                <div><b>Remaining Amt. Total :</b> {purchaseprice - ReceviedAmt}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div><b>Recevied Amount In Words : </b></div>
                                <div>{titleCase(inWords(ReceviedAmt.toString() || '0'))}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div><b>Remaining Amount In Words : </b></div>
                                <div>{titleCase(inWords((purchaseprice - ReceviedAmt).toString() || '0'))}</div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="footer">
                    {dealer.DealersData?.footerPhotoUrl ? <img src={`${dealer.DealersData.footerPhotoUrl}`} alt="Image to Print" width={"100%"} height={"80px"} loading={'lazy'} /> : <></>}
                </footer>
            </div>
        </Bill_Container>
    )
}

export default PrintBillLayout;

const Bill_Container = styled.div`
    .container{
        
        .truncate {
            white-space: nowrap;       /* Prevent text from wrapping */
            overflow: hidden;          /* Hide overflowing content */
            text-overflow: ellipsis;   /* Show ellipsis (...) */
        }

        display: grid;
        grid-template-rows: auto 1fr auto; /* Header, Content, Footer */
        height: 100vh; /* Set a fixed height for the entire container */
        
        grid-template-areas:
            "header"
            "content"
            "footer";
        
        .header {
            grid-area: header;
        }
            
        .content {
            display:flex;
            flex-direction:column;
            grid-area: content;
            justify-content:space-evenly;
        }
            
        .footer {
            grid-area: footer;
        }

        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }
        
        td, th {
            border: 1px solid red;
            text-align: left;
            padding: 8px;
        }
        
        tr:nth-child(odd) {
            background-color: #dddddd;
        }
    }

    /* Print styles */
    @media print {
        color:black !important;
        .container {
            width: 100%; /* Make sure content takes up full width */
            box-sizing: border-box; /* Include padding in the width */
            border:1px solid blue;

        }

        .content {
            display:flex;
            flex-direction:column;
            grid-area: content;
            justify-content:space-around;
        }

        body {
            font-size: 14px; /* Adjust font size for print readability */
        }

        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }
        
        td, th {
            border: 1px solid black;
            text-align: left;
            padding: 8px;
        }
        
        tr:nth-child(odd) {
            background-color: #dddddd;
        }
    }
`;

// {/* <div style={{ backgroundImage: `url('${Mangaldeep_Template_UP}')`, borderBottom: '1px solid black', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'contain', width: '100%', height: '150px', position: 'relative', top: '0' }}></div> */}
// <img src='https://static.vecteezy.com/system/resources/thumbnails/002/082/615/small/header-with-black-and-blue-overlapped-arrows-abstract-modern-banner-with-place-for-your-text-material-design-abstract-widescreen-background-vector.jpg' alt="Image to Print" width={"100%"} height={"150px"} loading={'lazy'} />
// <div className='content__container'>
//     <div style={{ display: 'flex', borderBottom: '1px solid black', justifyContent: 'space-between', padding: '0px 12px' }}>
//         <div>
//             <h2>Invoice</h2>
//         </div>
//         <div >
//             <h3>Date & Time : {Date().toString().split('GMT')[0]}</h3>
//         </div>
//     </div>
//     <div>
//         <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', padding: '12px 12px' }}>
//             <div style={{ width: '60%' }}>
//                 <h3>Dealer Details : </h3>
//                 <p>{'Mangaldeep Jewellers'}</p>
//                 <p>{'Vora Bazar, Opp. Nagar Pol Dela'}</p>
//                 <p>{'Bhavnagar - 364001'}</p>
//             </div>
//             <div style={{ width: '40%' }}>
//                 <h3>Customer Details : </h3>
//                 <p>Customer Name : {titleCase(data?.customername || '')}</p>
//                 <p>Customer Phone : {data?.customermobile || "9999999999"}</p>
//                 <p>Invoice Id: {data?._id || "634214512142251254"}</p>
//             </div>
//         </div>
//         <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '12px 12px' }}>
//             {/* <div>Gold 24KT : {data?.metal=='gold'?(data?.data?.metalpurity=='24KT'?(data?.data?.rate):(rates.gold_24)):(rates.gold_24) || rates?.gold_24}</div> */}
//             <div>Standards Rates </div>
//             <div>Gold 24KT : {"5000"}</div>
//             <div>Gold 22KT : {"4000"}</div>
//             <div>Gold 18KT : {"5000"}</div>
//             <div>Silver : {"45000"}</div>
//             <div>Labour : {"500"}</div>
//         </div>
//     </div>
//     <div style={{ height: 'max-content', padding: '0px 12px', border: "1px solid pink" }}>
//         <table>
//             <tr>
//                 <th>Product Name</th>
//                 <th>Metal</th>
//                 <th>Metal Purity</th>
//                 <th>Product Weight</th>
//                 <th>Rate</th>
//                 <th>Labour</th>
//                 <th>Extra</th>
//                 <th>ProductPrice Inc. GST</th>
//             </tr>
//             <tr>
//                 <td>{titleCase(data?.productname || '')}</td>
//                 <td>{titleCase(data?.metaltype || '')}</td>
//                 <td>{data?.metalpurity}</td>
//                 <td>{data?.metalweight}</td>
//                 <td>{data?.rate}</td>
//                 <td>{data?.labour}</td>
//                 <td>{data?.extra}</td>
//                 <td>{purchaseprice}</td>
//             </tr>
//         </table>
//         <p style={{ textAlign: 'center' }}>{titleCase(data?.message || 'Thanks For Trusting And Buying From Us.')}</p>
//     </div>
//     <div style={{ display: 'flex', flex: 1 }}>
//         {/* <div style={{ backgroundImage: `url('${data?.image}')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'contain', width: '100%', height: '100%' }}></div> */}
//         <div style={{ height: '100%', width: '100%', padding: '12px' }}>
//             <h3 style={{ textAlign: 'center' }}>Transaction Details</h3>
//             <table>
//                 <tr>
//                     <th>Date</th>
//                     <th>Amount</th>
//                 </tr>
//                 {data?.transaction.map((item) => {
//                     return <tr><td>{new Date(item.transactiondate).toString().split('GMT')[0]}</td><td>{item.amount}</td></tr>
//                 })}
//             </table>
//             <div style={{ display: 'flex', justifyContent: 'space-between', flex: '1' }}>
//                 <div>Recevied Amt. Total : {ReceviedAmt}</div>
//                 <div>Remaining Amt. Total : {purchaseprice - ReceviedAmt}</div>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', flex: '1' }}>
//                 <div><b>Recevied Amount In Words : </b></div>
//                 <div>{titleCase(inWords(ReceviedAmt.toString() || '0'))}</div>
//             </div>
//             <div style={{ display: 'flex' }}>
//                 <div><b>Remaining Amount In Words : </b></div>
//                 <div>{titleCase(inWords((purchaseprice - ReceviedAmt).toString() || '0'))}</div>
//             </div>
//         </div>
//     </div>
// </div>
// {/* <div style={{ backgroundImage: `url('${Mangaldeep_Template_Down}')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover', border: '1px solid red', width: '100%', height: '80px', position: 'absolute', bottom: '0' }}></div> */}
// <img src='https://static.vecteezy.com/system/resources/thumbnails/002/082/615/small/header-with-black-and-blue-overlapped-arrows-abstract-modern-banner-with-place-for-your-text-material-design-abstract-widescreen-background-vector.jpg' alt="Image to Print" width={"100%"} height={"150px"} loading={'lazy'} />