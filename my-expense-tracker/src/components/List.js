import React from "react";
import { ListGroup, ListGroupItemHeading, ListGroupItemText, Button } from "reactstrap";
import "./List.css";
import { ImCancelCircle } from 'react-icons/im';
import { FaRegTrashAlt } from 'react-icons/fa';

const List = ({ expenses, handleDeleteExpense, handleClearExpenses, }) => (
  <div className="history-container">
    <ListGroup className="list">
      <div className="section-title">    
        <h3>Transaction History</h3>
        <Button className="delete-all-button" type="submit" onClick={handleClearExpenses} color="danger">
          Delete All <ImCancelCircle />
        </Button>
      </div>
      {expenses.map((item) => (
        <ul className={item.amount < 0 ? "expense-transaction" : "income-transaction"} key={item.id}>
          <ListGroupItemHeading>{item.name}</ListGroupItemHeading>
          <ListGroupItemText>{item.amount < 0 ? "Expense" : "Income"}</ListGroupItemText>
          <ListGroupItemText>${item.amount}</ListGroupItemText>
          <ListGroupItemText>{item.category}</ListGroupItemText>
          <ListGroupItemText>{item.date}</ListGroupItemText>
          <ListGroupItemText>{item.comments}</ListGroupItemText>
          <Button type="submit" color="danger" onClick={() => handleDeleteExpense(item.id)}><FaRegTrashAlt/></Button>
        </ul>
      ))}
    </ListGroup>
  </div>
);

export default List;
