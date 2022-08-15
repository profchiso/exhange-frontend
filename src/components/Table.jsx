import React,{useState} from 'react'
import moment from 'moment';
import { PageHeader,Row,Col,Table,Statistic} from 'antd';

const columns = [
  {
    title: 'Date & Time',
    dataIndex: 'createdAt',
     render(text,record){
      return{
        props:{
          
        },
        children:<span>{moment(record.createdAt).format('DD/MM/YYYY  hh:mm')}</span>
      }
    }
  },
  {
    title: 'Currency From',
    dataIndex: 'currencyFrom',
  },
  {
    title: 'Amount 1',
    dataIndex: 'amount1',
  },
   {
    title: 'Currency To',
    dataIndex: 'currencyTo',
  },
   {
    title: 'Amount 2',
    dataIndex: 'amount2',
    render(text,record){
      return{
        props:{
          // style:{color:text==="Live Price"?"#5dbe7e":"#6368df"}
        },
        children:<Statistic precision={2} value={text} valueStyle={{fontFamily:"Red Hat Display",fontStyle:"normal",fontWeight:"400",fontSize:"14px",lineHeight:"152.2%"}}></Statistic>
      }
    }
  },
  {
    title: 'Type',
    dataIndex: 'type',
    render(text,record){
      return{
        props:{
          style:{color:text==="Live Price"?"#5dbe7e":"#6368df"}
        },
        children:<div>{text}</div>
      }
    }
  },
];

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//    props:{
//           style:{border:"1px solid black"}
//      },
// };


const TableCard=({tableData}) =>{
 
  const [current, setCurrent]= useState(1)

  const onChange=(pagination, filters, sorter, extra) => {
    setCurrent(pagination.current)
  }
  return (
    <>
     <PageHeader
            ghost={false}
            className="table-header"
          >
           
             <Row>
               <Col span={24} >
                <Table 
                  columns={columns} 
                  dataSource={tableData} 
                  size="small"  
                  pagination={{current:current,pageSize:4,position:["bottomLeft"], total:tableData.length, }}
                  defaultPageSize={4} 
                  sortDirections={["decend"]} 
                  rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                   onChange={onChange}
                  //  rowSelection={ rowSelection }
                  />
                  
               </Col>
            </Row>
          </PageHeader>
    </>
  )
}

export default TableCard