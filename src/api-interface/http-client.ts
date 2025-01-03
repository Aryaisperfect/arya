
export const get = async (url: string, errorData: unknown) => {
    try{
    const response = await fetch(url);
    const result  = await response.json();
    return result;
    }catch (err){
        console.log(err);
        return errorData;
    }
}

export const post = async (url: string, body: unknown, errorData: unknown) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      };
      
    try{
    const response = await fetch(url, requestOptions);
    const result  = await response.json();
    return result;
    }catch (err){
        console.log(err);
        return errorData;
    }
}