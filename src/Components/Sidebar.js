import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';

const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
})
export default function Sidebars() {
    const handleLogout = () => {
        localStorage.removeItem("Login")
    }
    const [toggled, setToggled] = useState(false);
    const [broken, setBroken] = useState(window.matchMedia('(max-width: 800px)').matches);
    const columns = [
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "company",
            label: "Company",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "city",
            label: "City",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "state",
            label: "State",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            label: "Contect",
            name: "contect"
        }

    ];
    const data = [
        { name: "Disu", company: "Decode-softtech", city: "Surat", state: "GJ", contect: "8140401032" },
        { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
        { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },

    ];
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
