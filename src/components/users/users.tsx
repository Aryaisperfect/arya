import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { get } from "src/api-interface/http-client";
import { USER_URL } from "src/api-interface/url-const";

const useUsers = () => {
    const [users, setUsers] = useState<{firstName: string, lastName: string}[]>([]);
    useEffect(() => {
        (async() => {
            const users = await get(USER_URL, []);
            setUsers(users);
        })();

    }, []);
    return {users}
}
export const Users = () => {
    const {users} = useUsers();
    const [columns, setColumns] = useState([
        {field: 'firstName'},
        {field: 'lastName'}
    ]);
    return (<>
    <div className="ag-theme-quartz" style={{height: '100%'}}>
    <AgGridReact
       rowData={users}
       columnDefs={[{field: 'firstName'},{field: 'lastName'}]}
   /></div>
    </>);
}