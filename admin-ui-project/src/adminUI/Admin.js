import React, {useState, useEffect} from 'react';
import SearchCompo from './Dashboard';
import searchIcon from '../images/search.svg';
import './admin.css';


function Admin() {
    const [itemSearch,setitemSearch] = useState('');
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchData = async() => {
            await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched Data = ");
                console.log(data);
                setData(data);
                setIsFetching(false);
            })
            .catch((err) => {console.log(err)})
        }
        fetchData();
    }, [])

    return (
        <div className="box">
             <div className="searchBox">
                <div className="searchInputBox">
                    <img src={searchIcon} className="imgIcon" alt="search_logo" />
                        <input type="text" className="searchInput" placeholder="Search by name, email or role...." onChange={(e) => {
                            setitemSearch(e.target.value);
                        }}/>
                </div>
                {
                    (!isFetching) ?
                    <SearchCompo data={data} searchTerm={itemSearch} />
                    : ''
                }
        </div>
        </div>
    )
}

export default Admin
