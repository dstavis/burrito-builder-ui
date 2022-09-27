import React, { Component } from 'react';
import "./OrderForm.css"

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    const errorMessage = "Form must have both a name and one or more ingredients to be submitted"
    if(this.state.name.length && this.state.ingredients.length) {
      this.props.addNewOrder(this.state)
      this.clearInputs();
    } else {
      
      console.log(errorMessage)
    }
  }

  handleNameChange = (event) => {
    const {name, value} = event.target
    this.setState({[name]: value })
  }

  handleIngredientChange = (event) => {
    event.preventDefault()
    const {name} = event.target
    this.setState( (previousState) => {
      return { ingredients: [...previousState.ingredients, name] }
    } )
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button className="ingredient-button" type="button" key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    let submittable = (this.state.name.length && this.state.ingredients.length)

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          required
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>
        {!submittable ? <p className="error-message">Please enter a name and one or more ingredients</p> : ""}
        <button className={!submittable ? "invalid submit": "submit"} onClick={e => {
          this.handleSubmit(e)} }>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
