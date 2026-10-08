import axios from "axios";
import { useState,useEffect,useCallback } from "react";


export function useApi(url,method={}){
    const[loading,setLoading]=useState(false);
    const[data,setData]=useState(null);
    const[error,setError]=useState(null);

    const mutate= useCallback(async()=>{
        setLoading(true)
        setError(null)

        try{
            const res = await axios(url,method)
            setData(res.data)
        }catch(err){
            setError(err)
            console.log(err)
        }finally{
            setLoading(false)
        }

    },[url,method])

    useEffect(()=>{
        mutate();
    },[mutate])

    return {loading,data,error,mutate}
}