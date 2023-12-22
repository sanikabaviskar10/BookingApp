// import "./datatable.scss";
// import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
// import { Link, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import useFetch from "../../hooks/useFetch"
// import axios from "axios"; 

// const Datatable = ({columns}) => {
//   // const [data, setData] = useState(userRows);
//   const [list, setList] = useState("");
//   const location = useLocation();
//   const path = location.pathname.split("/")[1];

//   const{data, loading, error} = useFetch(`/${path}`)
//   useEffect(() => {
//     console.log(path);
//     console.log(data);
//     setList(data);
//   }, [data]);
  
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/${path}/${id}`);
//       setList(list.filter((item) => item._id !== id));
//     } catch (err) {}
//   };

//   const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="cellAction">
//             {/*<Link to="/users/test" style={{ textDecoration: "none" }}>
//               <div className="viewButton">View</div>
//         </Link> */}
//             <div
//               className="deleteButton"
//               onClick={() => handleDelete(params.row._id)}
//             >
//               Delete
//             </div>
//           </div>
//         );
//       },
//     },
//   ];
//   return (
//     <div className="datatable">
//       <div className="datatableTitle">
//         {path}
//         <Link to={`/${path}/new`} className="link">
//           Add New
//         </Link>
//       </div>
//       <DataGrid
//         className="datagrid"
//         rows={list} 
//         columns={columns.concat(actionColumn)}
//         pageSize={9}
//         rowsPerPageOptions={[9]}
//         checkboxSelection
//         getRowId={row=>row._id}
//       />
//     </div>
//   );
// };

// export default Datatable;


import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { exportToExcel } from "./excelUtils"; // Create a utility function for exporting to Excel

const Datatable = ({ columns }) => {
  const [list, setList] = useState("");
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const handleDownloadExcel = () => {
    // Call the utility function to export data to Excel
    exportToExcel(list, `${path}_data`);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
        
      </div>
      <button onClick={handleDownloadExcel} className="downloadButton">
          Download Excel
        </button>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
        
      />
      
    </div>
  );
};

export default Datatable;
