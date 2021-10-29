import React, { Component } from "react";
import Joi from 'joi-browser'
import Input from '../input';
import Select from '../select';

class Form extends Component {
  state = {
    data: {},
    erros: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const results = Joi.validate(this.state.data, this.schema, options);
    if (!results.error) return null;

    const errors = {};
    for (let item of results.error.details) {
      errors[item.path[0]] = item.message;
    return errors;
    }
    
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const results = Joi.validate(obj, schema);
    return results.error ? results.error.details[0].message : null;
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;
    this.doSubmit();
  };

  renderInput = ( name, label, type='text') => {
      const { data, errors} = this.state;
    return (
        <Input
            name={name}
            value={data[name]}
            error={errors[name]}
            label={label}
            onChange={this.handleChange}
            type={type}
          />
    )
  }

  renderSelect = (name, label, options) =>{

    const { data, errors} = this.state;
    return (
       <Select name={name} value={data[name]} label={label} options={options} onChange={this.handleChange} error={errors[name]}/> 
    )
  }

  renderButton = (label) => {
      return (
        <button className="btn btn-primary mt-3" disabled={this.validate()} onClick={this.handleSubmit}>{label}</button>
      )
  }
}

export default Form;
