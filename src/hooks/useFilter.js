import { useState } from "react"
import { useLocalStorage } from "./useLocalStorage"


export  function useFilter(dataList, callback) {
   
 const [query, setQuery] = useLocalStorage('query','')
  const filteredData = dataList.filter((data1)=> 
         callback(data1).toLowerCase().includes(query)
    )

 return [filteredData, setQuery]
}
