import React, { useState } from 'react';
import "./Form.css";
import { MdAddCircleOutline } from 'react-icons/md';

import {
  Form as BTForm,
  FormGroup,
  Input,
  Label,
  Col,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";

// destructure props and update input fields with attributes
const Form = ({
  name,
  amount,
  category,
  date,
  comments,
  handleName,
  handleAmount,
  handleSubmitForm,
  handleCategory,
  handleDate,
  handleComments
}) => {
  
  return (
  <BTForm className="all-container" onSubmit={handleSubmitForm}>
      <div className="addTrans-title-container">
        <h3 className="add-transaction-title">Add a Transaction</h3>
      </div>
    <FormGroup className="row">
      <Col>
      <Label className="input-label">Expense Name</Label>
        <Input className="input-field"
          type="text"
          name="name"
          id="expenseName"
          value={name}
          onChange={handleName}
        />
      </Col>
      <Col>
      <Label className="input-label">$ Amount</Label>
        <Input className="input-field"
          type="number"
          name="amount"
          id="expenseAmount"
          placeholder="0.00"
          value={amount}
          onChange={handleAmount}
        />
      </Col>
      <Col>
      <Label className="input-label">Category</Label>
      <UncontrolledDropdown className="category-dropdown" id="category-drop" value={category}
          onClick={handleCategory}>
              <DropdownToggle caret>
              {category}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Income</DropdownItem>
          <DropdownItem  value="Salary">Salary</DropdownItem >
          <DropdownItem  value="Refunds">Refunds</DropdownItem >
          <DropdownItem  value="Grants">Grants</DropdownItem >
          <DropdownItem  value="Other">Other</DropdownItem >
        <DropdownItem header>Expenses</DropdownItem>
          <DropdownItem  value="Food">Food</DropdownItem >
          <DropdownItem  value="Bills">Bills</DropdownItem >
          <DropdownItem  value="Rent">Rent</DropdownItem >
          <DropdownItem  value="Mortgage">Mortgage</DropdownItem >
          <DropdownItem  value="Shopping">Shopping</DropdownItem >
          <DropdownItem  value="Transportation">Transportation</DropdownItem >
          <DropdownItem  value="Enterntainment">Enterntainment</DropdownItem >
          <DropdownItem  value="Car">Car</DropdownItem >
          <DropdownItem  value="Other">Other</DropdownItem >
        </DropdownMenu>
      </UncontrolledDropdown>      
      </Col>
      <Col>
      <Label className="input-label">Date</Label>
        <Input className="input-field"
          type="date"
          name="date"
          id="expenseDate"
          value={date}
          onChange={handleDate}
        />
      </Col>
      <button className="hvr-pulse-grow" type="submit">
      <MdAddCircleOutline />
      </button>
    </FormGroup>  
    <FormGroup className="row">
    <Col>
      <Label className="input-label">Comments</Label>
        <Input size="lg" className="input-field"
          type="text"
          name="comments"
          id="expenseComments"
          value={comments}
          onChange={handleComments}
        />
      </Col>
    </FormGroup> 
  </BTForm>
  )
};

export default Form;
