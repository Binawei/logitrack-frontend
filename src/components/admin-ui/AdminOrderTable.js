import React, { useEffect, useMemo, useState } from 'react'
import {useTable, usePagination} from 'react-table'
import { BiDotsVerticalRounded } from 'react-icons/bi'; 
import {RiArrowDropDownLine} from 'react-icons/ri'
import {MdFilterAlt} from 'react-icons/md'
import '../../css/admin-order.css'
import '../../css/dtable.css'
import OptionModal from './AdminOptionsModal'
import StatusModal from './AdminStatusModal'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import AdminAssignTo from './AdminAssignTo';
import { toast } from 'react-toastify';

function AdminOrderTable() {
    const [modalVisible, setModalVisible] = useState({});
    const [activeRow, setActiveRow] = useState(null);
    const [statusModalVisible, setStatusModalVisible] = useState({});
    const [assignToVisible, setAssignToVisible] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState({});
    const [selectedItems, setSelectedItems] = useState({}); 
    const [namedata, setNamedata] = useState([]);
    const [orderId, setOrderId] = useState('')
    const [deliveryManId, setDeliveryManId] = useState('')
    const [ridersData, setRidersData] = useState([]);


    const handleStatusSelect = (orderId, newStatus) => {
      setSelectedStatus(orderId, newStatus); 
    };
    
    function formatCreationTime(creationTime) {
      const date = new Date(creationTime);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    }
    

    const handleStatusChange = async (orderId, newStatus) => {
      console.log('Received orderId:', orderId);
      console.log('Received newStatus:', newStatus);
    
      try {
        const bearerToken = JSON.parse(localStorage.getItem("bearerToken"));
        const apiUrl = `${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/api/v1/order/${orderId}/status?newStatus=${newStatus}`;
        
        console.log('API URL:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken,
          }
        });
        console.log(bearerToken)
  
        console.log('Response:', response);
    
        const responseData = await response.json();
        console.log('Response Data:', responseData);
    
        setData((prevData) => {
          return prevData.map((item) => {
            if (item.id === orderId) {
              return { ...item, status: newStatus };
            }
            return item;
          });
        });
        setSelectedStatus((prevStatus) => ({
          ...prevStatus,
          [orderId]: newStatus,
        }));
      } catch (error) {
        console.error("Error:", error);
      }
    };
   
    const handleAssignOrder = async (orderId, deliveryManId, Name, rowIndex) => {
      console.log("OrderId received:", orderId);
      console.log("DeliveryManId received:", deliveryManId);
  
      try {
        const bearerToken = JSON.parse(localStorage.getItem("bearerToken"));
        console.log("Bearer token is:", bearerToken);
  
        const response = await fetch(`${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/api/v1/admin/assign-order-to-deliveryman`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken,
          },
          body: JSON.stringify({
            orderId: orderId,
            deliveryManId: deliveryManId,
          }),
        });
  
        console.log("response is", response);
        const responseData = await response.json();
        console.log("ResponseData is", responseData);
        if (responseData.code === "00") {
          // toast.success(responseData.status, {
          //   position: toast.POSITION.TOP_CENTER,
          //   autoClose: 3000,
          // });
          setSelectedItems((prev) => ({
            ...prev,
            [rowIndex]: `${Name}`, 
          }));
        } else {
          toast.error(responseData.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      const fetchName = async () => {
        try {
          const bearerToken = JSON.parse(localStorage.getItem("bearerToken"));
          console.log("Bearer token is:", bearerToken);
    
          const response = await fetch(`${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/api/v1/admin/all-riders`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': bearerToken,
            }
          });
          console.log(response);
    
          const result = await response.json();
    
          if (result.content && Array.isArray(result.content)) {
            const fullNames = result.content.map((rider) => rider.fullName);    
            setNamedata(fullNames);
            const ridersWithId = result.content.map((rider) => ({
              riderId: rider.id,
              name: rider.fullName,
            }));
            setRidersData(ridersWithId);
          } else {
            setError("Invalid API response format");
          }
    
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
    
      fetchName();
    }, []);
    
    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const bearerToken = JSON.parse(localStorage.getItem("bearerToken"));
          console.log("Bearer token is:", bearerToken);
    
          const response = await fetch(`${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/api/v1/admin/incomingOrders`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': bearerToken,
            }
          });
          console.log("Response status:", response.status, "Status text:", response.statusText);
    
          if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            console.log(response)
            return;
          }
    
          const result = await response.json();
          console.log(result.code)
          if (result.code === "200") {
            console.log("Response data:", result.data);
    
            if (result.data && result.data.content) {
              setData(result.data.content);
            } else {
              setError("Invalid API response format");
            }
    
            setLoading(false);
          } else {
            console.error("API response code is not 200.");
          }
        } catch (error) {
          console.error("Error:", error);
          setError(error.message);
          setLoading(false);
        }
      };
    
      fetchData();
    }, []);
    
    

    const columns = useMemo(() => [
      {
        Header: 'Order ID',
        accessor: 'orderReference', 
      },
      {
        Header: 'Customer ID',
        accessor: 'user.customId', 
      },
      {
        Header: 'Assign To',
        accessor: 'assignTo', 
        Cell: () => (
          <div className="assign-button">
            Assign
            <RiArrowDropDownLine className='drop-down-icon'/>
          </div>
        ),
        disableSortBy: true,
        width: 30,
      },
      {
        Header: 'Date Created',
        accessor: 'creationTime',
        Cell: ({ cell: { value } }) => {
          const formattedDate = formatCreationTime(value);
          return formattedDate;
        },
      },
      {
        Header: 'Amount',
        accessor: 'weight', 
      },
      {
        Header: 'Status',
        accessor: 'status', 
        Cell: ({value}) => (
          <div className="assign-button">
            <RiArrowDropDownLine className='drop-down-icon'/>
          </div>
        ),
        disableSortBy: true,
        width: 30,
      },
      {
        Header: '',
        accessor: 'dots',
        Cell: () => (
          <div className="dots-cell">
            <BiDotsVerticalRounded />
          </div>
        ),
        disableSortBy: true,
        width: 30,
      },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state: { pageIndex, pageSize },
        gotoPage,
        pageOptions,
        setPageSize,
      } = useTable(
        {
          columns,
          data,
          initialState: {
            selectedRowIds: {},
            pageIndex: 0,
            pageSize: 6,
          },
        },
        usePagination
      );
    
      return (
        <div className="general-admin-table">
            <div className='sub-general'>
          <div className="first-top">
            <p id="text">Orders</p>
    
            <div className="filters-ic">
              <p id="filter">Filter</p>
              <MdFilterAlt className="filters-icon" />
            </div>
          </div>
          <div>
            <table {...getTableProps()} className="my-table">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    className="custom-headerss"
                  >
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="custom-row">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="table-cell">
                      {cell.column.id === 'dots' ? (
                        <div className="dots-cell">
                          <BiDotsVerticalRounded
                            onClick={() => {
                              if (modalVisible[rowIndex]) {
                                setModalVisible((prev) => ({
                                  ...prev,
                                  [rowIndex]: false,
                                }));
                              } else {
                                setActiveRow(rowIndex);
                                setModalVisible((prev) => ({
                                  ...prev,
                                  [rowIndex]: true,
                                }));
                                setStatusModalVisible((prev) => ({
                                  ...prev,
                                  [rowIndex]: false,
                                }));
                              }
                            }}
                          />
                          {modalVisible[rowIndex] &&
                            activeRow === rowIndex && (
                              <OptionModal orderId={row.original.id} />
                            )}
                        </div>
                      ) : cell.column.id === 'status' ? (
                        <div className="assign-button">
                        <p>
                          {selectedStatus[row.original.id] || "status"}
                        </p>
                        <RiArrowDropDownLine
                          className="drop-down-icon"
                          onClick={() => {
                            if (statusModalVisible[rowIndex]) {
                              setStatusModalVisible((prev) => ({
                                ...prev,
                                [rowIndex]: false,
                              }));
                            } else {
                              setStatusModalVisible((prev) => ({
                                ...prev,
                                [rowIndex]: true,
                              }));
                            }
                          }}
                        />
                        {statusModalVisible[rowIndex] && (
                         <StatusModal
                         orderId={row.original.id}
                         onStatusChange={(status) => handleStatusChange(row.original.id, status)}
                         onStatusSelect={handleStatusSelect}
                       />
                        )}
                      </div>
                      ) : cell.column.id === 'assignTo' ? (
                        <div className="assign-button">
                            <p>{selectedItems[rowIndex] || "Assign To"}</p>
                            <RiArrowDropDownLine
                              className="drop-down-icon"
                              onClick={() => {
                                if (assignToVisible[row.id]) {
                                  setAssignToVisible((prev) => ({
                                    ...prev,
                                    [row.id]: false,
                                  }));
                                } else {
                                  setAssignToVisible((prev) => ({
                                    ...prev,
                                    [row.id]: true,
                                  }));
                                }
                              }}
                            />
                            {assignToVisible[row.id] && (
                              <AdminAssignTo
                                visible={assignToVisible[row.id]}
                                items={ridersData}
                                onItemClick={(item) => handleAssignOrder(row.original.id, item.riderId, item.name, rowIndex)}
                              />
                            )}

                          </div>
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
            </table>
          </div>
        
    <div className="pagination-aod">
      <button
        onClick={() => {
          if (pageIndex > 0) {
            gotoPage(pageIndex - 1);
          }
        }}
        disabled={pageIndex === 0}
      >
        <GrLinkPrevious /> Previous
      </button>{' '}
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
      <span className="custom-span">
        Go to page{' '}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const pageNumber = e.target.value
              ? Number(e.target.value) - 1
              : 0;
            gotoPage(pageNumber);
          }}
          style={{ width: '50px' }}
        />
      </span>
      <button
        onClick={() => {
          if (pageIndex < pageOptions.length - 1) {
            gotoPage(pageIndex + 1);
          }
        }}
        disabled={pageIndex === pageOptions.length - 1}
      >
        Next <GrLinkNext />
      </button>{' '}
    </div>

          </div>

        </div>
      );
    }
    
    export default AdminOrderTable;