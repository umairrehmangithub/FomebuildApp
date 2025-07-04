import { useState } from 'react'
import Input from './Input'
import Select from './Select'

export default function ExpenseForm({ setExpenses,
  expense,
  setExpense,
  editingRowId,
  setEditingRowId }) {
  const [errors, setErrors] = useState({})
  const validationConfig = {
    title:
      [{ required: true, massage: 'Please enter title' },
      {
        minLength: 2,
        massage: 'Title should be at least 2 charcters long'
      }],
    category: [{ required: true, massage: 'Please select a category' }],
    amount: [
      { required: true, 
      massage: 'Please enter a amount',
     },
     { pattern: /^[1-9]\d*(\.\d+)?$/, 
      massage: 'Please enter a vaild number',
     }
    ],

  }

  const validate = (formData) => {
    const errorsData = {}

    Object.entries(formData).forEach(([key, value]) => {

      validationConfig[key].some((rules) => {

        if (rules.required && !value) {
          errorsData[key] = rules.massage
          return true
        }
        if (rules.minLength && value.length < rules.minLength) {
          errorsData[key] = rules.massage
          return true
        }
        if (rules.pattern && !rules.pattern.test(value)) {
          errorsData[key] = rules.massage
          return true
        }
      })
    });


    setErrors(errorsData)
    return errorsData
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validateresult = validate(expense)
    if (Object.keys(validateresult).length) return


    if (editingRowId) {
      setExpenses((prevState) => 
        prevState.map((singleExpense) => {
          if (singleExpense.id === editingRowId) {
            return { ...expense, id: editingRowId }
          }
          return singleExpense
        })
      )
      setExpense({
      title: '',
      category: '',
      amount: '',

    })
      setEditingRowId('')
      return
    }

    setExpenses((prevState) =>
      [...prevState,
      { ...expense, id: crypto.randomUUID() }
      ])
    setExpense({
      title: '',
      category: '',
      amount: '',

    })
  }
  // console.log(expense)
  const handleChange = (e) => {
    const { name, value } = e.target
    setExpense((prevState) =>
      ({ ...prevState, [name]: value }))
    setErrors({})
  }
  return (
    <form className="expense-form" onSubmit={handleSubmit}>

      <Input label='Title'
        id='title'
        name='title'
        value={expense.title}
        onChange={handleChange}
        errors={errors.title}
      />
      <Select
        label='Category'
        id='category'
        name='category'
        value={expense.category}
        onChange={handleChange}
        options={['Grocery', 'Clothes', 'Bills', 'Education', 'Medicine']}
        defaultOption='Select Category'
        errors={errors.category} />
      <Input label='Amount'
        id='amount'
        name='amount'
        value={expense.amount}
        onChange={handleChange}
        errors={errors.amount}
      />

      <button className="add-btn">{editingRowId ? 'Save' : 'Add'}</button>
    </form>

  )
}
