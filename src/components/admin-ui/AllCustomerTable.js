
import React from 'react';
import { useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import { BiDotsVerticalRounded } from 'react-icons/bi'; // Import the dots icon
import { BiDotsHorizontal } from 'react-icons/bi';
import "./AllCustomerTable.css"
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import UserOptionModal from './UserOptionModal';

function CustomerTable() {
    const [checkedRows, setCheckedRows] = useState({});
    const [modalVisible, setModalVisible] = useState({});
    const [activeRow, setActiveRow] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const bearerToken = JSON.parse(localStorage.getItem("bearerToken"));
            console.log("Bearer token is:", bearerToken);
    
            const response = await fetch(`${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/api/v1/admin/all-customers`, {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': bearerToken,
              }
            });
            console.log(response)
    
            const result = await response.json();
            console.log(result)
    
            if (result.content && Array.isArray(result.content)) {
              setData(result.content);
            } else {
              setError("Invalid API response format");
            }
    
            setLoading(false);
          } catch (error) {
            setError(error.message);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

    const columns = React.useMemo(() => [
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
            Header: 'CUSTOMER ID',
            accessor: 'customId',
        },
        {
            Header: 'FULL NAME',
            accessor: 'fullName',
        },
        {
            Header: 'EMAIL',
            accessor: 'email',
        },
        {
            Header: 'PHONE NUMBER',
            accessor: 'phoneNumber',
        },
        {
            Header: 'DATE JOINED',
            accessor: 'creationDate',
            Cell: ({ value }) => (
                <div className={`statu----s-cell ${value}`}>
                    {value}
                </div>
            ),
        },
        {
            Header: '',
            accessor: 'dots',
            Cell: () => (
                <div className="dots-cell">
                    < BiDotsVerticalRounded />     
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
    } = useTable({
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
                                        return <td {...cell.getCellProps()} className="table-cell">
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
                                                        <UserOptionModal />
                                                    )}
                                                </div>
                                            ) : (
                                                cell.render('Cell')
                                            )}</td>;
                                    })}

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination controls */}
            
            <div className="pagination-acm">
                <button
                    onClick={() => {
                        if (pageIndex > 0) {
                            // Go to the previous page
                            gotoPage(pageIndex - 1);
                        }
                    }}
                    disabled={pageIndex === 0}
                >
                    <GrLinkPrevious /> Previous
                </button>{' '}
                <span className='custom-span'>
                    Go to page{' '}
                    <input type='number' defaultValue={pageIndex + 1} onChange={e => {
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(pageNumber)
                    }} style={{ width: '50px' }} />
                </span>
                <button
                    onClick={() => {
                        if (pageIndex < pageOptions.length - 1) {
                            // Go to the next page
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
export default CustomerTable;
