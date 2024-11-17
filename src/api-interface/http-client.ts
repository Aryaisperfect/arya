export const get = async (url: string, errorData: unknown) => {
    try{
    const response = await fetch(url);
    const result  = response.json();
    return result;
    }catch (err){
        console.log(err);
        return errorData;
    }

}