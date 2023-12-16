import React, { useState, useEffect, useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import TableModal from './TableModal';
import '../css/dtable.css';
import axios from 'axios'; 

function OrderTable() {
  const [data, setData] = useState([]);
  const [checkedRows, setCheckedRows] = useState({});
  const [modalVisible, setModalVisible] = useState({});
  const [activeRow, setActiveRow] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const bearerToken = JSON.parse(localStorage.getItem("bearerToken"));
      console.log("Bearer token is:", bearerToken);

      const response = await fetch(`${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/api/v1/order/all-orders`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': bearerToken,
        }
      });
      console.log(response);

    

      const responseData = await response.json();
      console.log('JSON Response:', responseData);
    
      if (responseData && responseData.code === '00') {
        setData(responseData.data.content);
      } else {
        console.error('API Response Error:', responseData);
      }
    } catch (error) {
      console.error('JSON Parsing Error:', error);
    }
  };

  fetchData();
}, []);

const handleDeleteOrder = async (orderId) => {
  console.log(`${process.env.REACT_APP_LOGI_TRACK_BASE_URLL}/api/v1/order/${orderId}`)
  console.log("Order ID to be deleted:", orderId);

  try {
    const bearerToken = JSON.parse(localStorage.getItem('bearerToken'));
    const url = `${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/api/v1/order/${orderId}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken,
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.code === '00') {
        console.log('Order deleted successfully.');
        setData((prevData) => {
          return prevData.filter((order) => order.id !== orderId);
        });
      } else {
        console.error('Failed to delete order:', responseData.message);
      }
    } else {
      console.error('Failed to delete order. Status:', response.status);
    }
  } catch (error) {
    console.error('Error deleting order:', error);
  }
};

  
  const columns = useMemo(()=>[
    {
      Header: '',
      accessor: 'checkbox',
      Cell: ({ row }) => (
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={checkedRows[row.id]}
            onChange={() => {
              setCheckedRows((prevCheckedRows) => ({
                ...prevCheckedRows,
                [row.id]: !prevCheckedRows[row.id],
              }));
            }}
          />
          <span className="checkmark"></span>
        </label>
      ),
      disableSortBy: true,
      width: 60,
    },
    {
      Header: 'Order ID',
      accessor: 'orderReference',
    },
    {
      Header: 'Address Delivered',
      accessor: 'deliveryAddressTextFormat',
    },
    {
      Header: 'Ordered',
      accessor: 'creationTime',
      Cell: ({ value }) => {
        const creationTimeArray = (value);

        const creationDate = new Date(
          creationTimeArray[0],
          creationTimeArray[1] - 1,
          creationTimeArray[2], 
          creationTimeArray[3], 
          creationTimeArray[4], 
          creationTimeArray[5]  
        );
        
        const formattedCreationTime = creationDate.toLocaleDateString('en-US', {
          year: 'numeric',
          day: '2-digit',
          month: '2-digit',
        });
        
        console.log(formattedCreationTime); 
        
        return formattedCreationTime;
      }
    },
    {
      Header: 'Recipient',
      accessor: 'recipientName',
    },
    {
      Header: 'Status',
      accessor: 'status',
      
    },
     {
      Header: '', 
      accessor: 'dots',
      Cell: () => (
        <div className="dots-cell">
           <BiDotsVerticalRounded/>
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
    <div className="Tablecontainer">
      <div className='topTable'>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="header-row">
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
            <tr {...row.getRowProps()} className="table-row">
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
                          }
                        }}
                      />
                      {modalVisible[rowIndex] && activeRow === rowIndex && (
                        <TableModal id={row.original.id} onDeleteOrder={handleDeleteOrder} />
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
      <div className="pagination">
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
        <span className='custom-span'>
          Go to page{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
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
  );
}


export default OrderTable;
