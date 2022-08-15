import React ,{useState} from 'react';
import {
  useQuery,
  useMutation,
} from '@tanstack/react-query'
import axios from 'axios';
import { Layout,PageHeader,Row,Col,Spin,Result, message} from 'antd';
import ExchangeCard from './ExchangeCard';
import FilterCard from './FilterCard'
import Table from "./Table";
const webSocketClient= new WebSocket(process.env.REACT_APP_API_WEBSOCKET_SERVER_URL);

 
const AppContainer = () => {

    //Exchange cards states
    const [currencyFrom, setCurrencyFrom] = useState("Bitcoin");
    const [currencyTo, setCurrencyTo] = useState("USD");
    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(0);
    const[isFeedback, setFeedback] = useState(false);
    const [tableData, setTableData] = useState([]);

    //filter card states
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const[type,setType]=useState("All");

    // exchange card functions
    const handleCurrencyFromChange = async(value) => {
        
        setCurrencyFrom(value);
        setFeedback(false)
        fetchExchangeRates()
    };
    const handleCurrencyToChange = async(value) => {
         
        setCurrencyTo(value);
        setFeedback(false)
        fetchExchangeRates()
    };
    const handleAmount1Change = async(e) => {
         
        const {value}=e.target
        setAmount1(value);
        setFeedback(false)
        fetchExchangeRates()
    }
    const handleAmount2Change = async(e) => {
        const {value}=e.target
        setAmount2(value);
        setFeedback(false)
    }
    
    

    // filter  card functions
    const onFromDateChange = (date, dateString) => {
        setFromDate(dateString);
        setFeedback(false)
    };
     const onToDateChange = (date, dateString) => {
        setToDate(dateString);
        setFeedback(false)
    };
    const onTypeChange = (value) => {
        setType(value);
        setFeedback(false)
    }
    



    //table functions
    const fetchExchanges=async () =>{
        if(type && !fromDate && !toDate){
          const {data} = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/exchanges?type=${type}`);
          return data;
    } if(type && fromDate && toDate){
        const {data} = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/exchanges?type=${type}&fromDate=${fromDate}&toDate=${toDate}`);
        return data;
    }
}
  const {isLoading , isError, refetch}=useQuery(["exchanges"], fetchExchanges,{refetchInterval:0,
    onSuccess:(d)=>{
        setTableData(d.data)
    }
});

  const saveExchanges=async ()=>{
    const payload={amount1:Number(amount1),amount2:Number(amount2),currencyFrom,currencyTo,type:"Exchanged"}
    if(!currencyTo){
        return message.error("Please select currency to")
    }
    if(!currencyFrom){
        return message.error("Please select currency from")
    }
    if(!amount2 || amount2 === 0){
        return message.error("Amount2 must be greater than zero")
    }
    const {data}=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/exchanges`,payload)
    setFromDate("");
    setToDate("");
    setType("All")
    console.log(data);

  }
  const {mutate:postExchange}=useMutation(saveExchanges,{
    onSuccess:()=>{
        setFeedback(true)
        refetch();
    }
  })

  //get exchange rates
    const fetchExchangeRates=async () =>{
        const payload={amount1:Number(amount1),coin:currencyFrom,fiat:currencyTo}
    if(!currencyTo ||!currencyFrom ||!amount1 || amount1 === 0){
        return 
    }else{
        const {data}=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/exchanges/coin-to-fiat`,payload)
        setFromDate("");
        setToDate("");
        setType("All")
        setAmount2(data.data.amount2)
    }
    }

     webSocketClient.onmessage = function(event) {
    const data = JSON.parse(event.data);
    setTableData(data);

 }
 webSocketClient.onopen=()=>{
  console.log(" websocket connected successfully");
 }

  return (
    <>
        <Layout className="layout">
          <ExchangeCard
            amount1={amount1}
            amount2={amount2}
            currencyFrom={currencyFrom}
            currencyTo={currencyTo}
            handleCurrencyFromChange={handleCurrencyFromChange}
            handleCurrencyToChange={handleCurrencyToChange}
            handleAmount1Change={handleAmount1Change}
            handleAmount2Change={handleAmount2Change}
            postExchange={postExchange}
          />
          
          <FilterCard 
            onFromDateChange={onFromDateChange}
            onToDateChange={onToDateChange}
            onTypeChange={onTypeChange}
            refetch={refetch}
          />
          {
            isLoading ? <Spin size="large" /> :<Table 
           tableData={tableData}
          
          />
          }
          {
            isError?   <Result
                        status="500"
                        title="500"
                        subTitle="Sorry, something went wrong."
    
                        />
                        :
                        null
          }

          
          <PageHeader
            ghost={false}
            className="feedback-header"
          >
            <Row className='feedback'>
               <Col span={24}>Feedback</Col>
            </Row>
             <Row className='feedback-message' style={{display:`${isFeedback? "":"none"}`}}>
               <Col span={24} className='feedback-content'>Exchange Submitted</Col>
            </Row>
            </PageHeader>
        </Layout> 
    
    </>
  )
}

export default AppContainer