import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import Firebase from './Firebase'
import moment from 'moment';
const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
})
export default function Sidebars() {
    const [alldata, setAlldata] = useState([])
    const handleLogout = () => {
        localStorage.removeItem("Login")
    }
    useEffect(() => {
        getdata()

    }, [])

    const getdata = () => {
        let data = []
        let db = Firebase.firestore();
        db.collection("inquiry")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    data.push(doc.data())
                    setAlldata(data)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }
    const [toggled, setToggled] = useState(false);
    const [broken, setBroken] = useState(window.matchMedia('(max-width: 800px)').matches);
    const columns = [{
        name: "name",
        label: "name",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "email",
        label: "email",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "message",
        label: "message",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "tnd",
        label: "tnd",
        options: {
            filter: true,
            sort: false,
            customBodyRender: (value) => {
                return (
                    <>
                        {moment(value).fromNow()} {/* Use moment.js to format time ago */}
                    </>
                );
            },
        }
    },
    {
        label: "id",
        name: "id"
    }

    ];
    const data = alldata
    const options = {
        filterType: 'checkbox',
    };
    return (
        <div style={{ display: 'flex', height: '100%', minHeight: '1000px' }}>
            <Sidebar toggled={toggled} customBreakPoint="800px" onBreakPoint={setBroken}>
                <Menu>
                    <MenuItem><Link to={'/'}>Home</Link> </MenuItem>


                    <MenuItem> <Link to={'/login'} onClick={handleLogout}>Logout</Link></MenuItem>
                </Menu>
            </Sidebar>
            <main style={{ padding: 10 }}>
                <div>
                    {broken && (
                        <button className="sb-button" onClick={() => setToggled(!toggled)}>
                            Toggle
                        </button>
                    )}
                </div>
                <div className='container'>

                    <CacheProvider value={muiCache}>
                        <ThemeProvider theme={createTheme()}>
                            <MUIDataTable
                                title={"Employee List"}
                                data={data}
                                columns={columns}
                                options={options}
                            />
                        </ThemeProvider>
                    </CacheProvider>

                </div>
            </main>
        </div>
    );
}
