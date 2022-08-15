import React from 'react'
import {PageHeader,Row,Col,Button,Select,DatePicker,} from 'antd';
const { Option } = Select;
function FilterCard({onFromDateChange,onToDateChange,onTypeChange, refetch}) {
  return (
    <>
    <PageHeader
            ghost={false}
            className="filter-header"
          >
            <Row className='page-header-title'>
               <Col span={24} >History</Col>
            </Row>
            <Row gutter={{ xs:8, sm: 8, md: 8, lg: 8 }}>
              <Col span={14} className="form-container"  >
                <Row gutter={{ xs:8, sm: 8, md: 16, lg: 16 }}>
                  <Col span={6} >
                    <span className="input-label">From date</span> 
                    <div className="my-select-container">
                      <DatePicker 
                         size='large' 
                         format={'DD/MM/YYYY'} 
                         style={{
                            borderRadius: "8px",
                            fontSize: "17px",
                          }}
                          onChange={onFromDateChange}
                         />
                    </div>
                  </Col>
                  <Col span={6} >
                    <span className="input-label">To date</span> 
                      <div className="my-select-container">
                      <DatePicker 
                        size='large' 
                        format={'DD/MM/YYYY'} 
                         style={{
                            borderRadius: "8px",
                            fontSize: "17px",
                          }}
                          onChange={onToDateChange}
                        />
                    </div>
                  </Col>
                  <Col span={6} >
                    <span className="input-label">Type</span>
                     <div className="my-select-container">
                            <Select 
                                className='fiat-selector' 
                                size='large' 
                                bordered={true} 
                                defaultValue={"All"}
                                onChange={onTypeChange}
                                >
                              <Option value="All">All</Option>
                              <Option value="Live Price">Live Price</Option>
                              <Option value="Exchanged">Exchanged</Option>
                            </Select>
                          </div>
                  </Col>
                  <Col span={6} >
                    <br/>
                    <Button 
                        className='filter-button' 
                        size="middle" 
                        type="ghost"
                        onClick={() => refetch()}
                        >Filter</Button>
                   </Col>
                </Row>
              </Col>
              <Col span={10} ></Col>
            </Row>
          </PageHeader>
    </>
  )
}

export default FilterCard