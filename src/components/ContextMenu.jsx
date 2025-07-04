import React from 'react'

export default function ContextMenu({menuPosition, 
  setMenuPosition,
   setExpenses,
   expenses,
   setEditingRowId, 
   rowId,
   setExpense,
   
  }) {
              

  if(!menuPosition.left) return
  return (
    <div className="context-menu" style={{...menuPosition}}>
            <div onClick={()=>{
              const {title,category, amount} = expenses.find((e) => e.id === rowId)
              setEditingRowId(rowId)
              setExpense({title,category, amount})
              setMenuPosition({})
            }}>Edit</div>
            <div onClick={()=>{
              setExpenses((prevState)=> prevState.filter(expense=> expense.id !== rowId))
              setMenuPosition({})
            }}>Delete</div>
        </div>
  )
}
