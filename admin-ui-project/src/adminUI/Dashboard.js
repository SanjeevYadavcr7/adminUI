import React,{ useState, useEffect } from 'react'
import './admin.css';
import editIcon from '../images/edit.svg';
import deleteIcon from '../images/delete.svg';

function Dashboard(props) {
    const {searchTerm} = props;
    const [data, setData] = useState(props.data);
    const [pageData, setPageData] = useState((props.data));

    const [pages, setPages] = useState([]);    
    let newArr = [];
    useEffect(() => {
        const setRows = () => {
            console.log("Setting Rows")
            for (let i=1;i<= Math.ceil(props.data.length/10);i++) {
                // totalPages.push(i);
                newArr = [...newArr,i];
            }
            setPages(newArr)
            // console.log(pages)
        }
        setRows();
    }, [])
    
    
    const [Checked, setChecked] = useState([]);
    let flag = 0;
    if(searchTerm.toLowerCase().includes('.com') || searchTerm.toLowerCase().includes('@')) flag=2;
    else if(searchTerm === 'member' || searchTerm === 'admin' || searchTerm.toLowerCase().includes('me') || searchTerm.toLowerCase().includes('ad')) flag = 3;
    else flag = 1;

    function deleteRow(e){
        // console.log(e);
        let newRows = [...pageData];
        newRows.splice(e,1);
        setPageData(newRows);
    }

    const handleToggle = (e) =>{
        const rowGray = document.querySelector(`#row-${e}`);
        // console.log(selected);
        const currIndex = Checked.indexOf(e);
        const newChecked = [...Checked];
        if(currIndex === -1){
            rowGray.classList.add('gray');
            newChecked.push(e);
        }
        else{
            rowGray.classList.remove('gray');
            newChecked.splice(currIndex,1);
        }
        setChecked(newChecked);
        console.log(newChecked)
    }

    const allChecked = () => {
        // for selecting all users at once
        const newChecked = [];
        for(let i=0;i<pageData.length;i++){
            newChecked.push(i);
        }
        setChecked(newChecked);
    }

    const checkUnCheck = (id) => {
        const item = document.querySelector(`#${id}`);
        if(item.checked) item.checked = false;
        else item.checked = true;
    }

    const deleteChecked = () => {
        // console.log("Hello");
        let newRows = [...pageData];
        Checked.sort();
        // console.log("Checked = ");
        // console.log(Checked);
        for(let i=0;i<Checked.length;i++){
            // adjusting the index on deletion 
            // for ex. arr=[1,2,3] so on deleting 1st row first, 2nd row becomes first 
            // so to target 2nd row which has became 1st we do Checked[i]-1 i.e. 2-1 = 1st row
            newRows.splice(Checked[i]-i,1);   
        }

        for(let i=0;i<Checked.length;i++){
            checkUnCheck(`box-${Checked[i]}`);
            const rowGray = document.querySelector(`#row-${Checked[i]}`);
            rowGray.classList.remove('gray'); 
        }
        setChecked([]);
        setPageData(newRows);
        // setPageData(newRows.slice(0,11));
    }

    const switchPage = (row) => {
        
        console.log("Switching Page = "+row);
        const from = (row===1) ? 0:(row-1)*10+1; 
        const to = (from===0) ? from+10 : (data.length-from >= 10) ? from+10 : data.length;
        console.log("From = "+from+" | To = "+to);

        const newPage = data.slice(from,to);
        setPageData(newPage)
    }

    useEffect(() => {
        setPageData(data.slice(0,10))
    },[])

    return (
        <div className="statusTable">
            <table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" onClick={allChecked} />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (pageData.length) ?
                        pageData.filter((rowData) => {
                            if(flag === 0) return rowData;
                            else if(flag === 1) return rowData.name.toLowerCase().includes(searchTerm.toLowerCase())
                            else if(flag === 2) return rowData.email.toLowerCase().includes(searchTerm.toLowerCase())
                            else if(flag === 3)return rowData.role.toLowerCase().includes(searchTerm.toLowerCase())
                        }).map((row, index) => {
                                return(
                                    <tr key={index} id={`row-${index}`}>
                                        <td>
                                        <input type="checkbox" value={index} id={`box-${index}`}
                                        onClick={
                                            (e) => {
                                                handleToggle(index);
                                            }
                                        }
                                        />
                                        </td>
                                        <td>{row.name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.role}</td>
                                        <td className="actions">
                                            <img src={editIcon} alt="edit" />
                                            <img src={deleteIcon} alt="delete"
                                            onClick={(e) => deleteRow(index)} />
                                        </td>
                                    </tr>
                                )
                            }) 
                        : 'No data'
                    }
            </tbody>
            </table>
            <div className="buttonBox">
                <button className="deleteClass" onClick={deleteChecked}>Delete Selected</button>
                <div className="buttons">
                {
                    pages.map((row, index) => {
                        return(
                            <button className="pageNext" key={index} onClick={(e) => switchPage(row)}>
                                <span>Page</span>{`${row}`}
                            </button>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default Dashboard
