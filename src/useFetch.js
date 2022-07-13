import { useState, useEffect } from "react";
const useFetch = (url) => {
    const [data, setData]= useState(null);
    const [isLoading, setLoading]= useState(true);
    const [error, setError] = useState(null);
    const [isNull, setNull] = useState(false);
    useEffect(() => {
        const abortCont = new AbortController();
        console.log(url)
        fetch(url, { signal: abortCont.signal })
        .then(res => {
         if(!res.ok){
             throw Error('Something went wrong')
         }
         return res.json();
        }).then(data => {
         setError(null);
         setData(data);
         console.log(data.length);
         if(data.length===0)
         {
            setNull(true);
         }
         setLoading(false);
        }).catch(err => {
         if(err.name=== 'AbortError'){
            console.log('abort fetch');
         }else{
            setError(err.message);
            setLoading(false);}
        })

        return () => abortCont.abort(); 
     }, [url]);

     return{ data,isLoading,error, isNull }
}

export default useFetch;