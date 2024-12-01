import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import { Column } from "react-table";
import moment from "moment";
import API from "../../Api";
import Pagination from "../../SubComponents/Paginator/Pagination";
import "./visits.scss";
import { useNavigate } from "react-router-dom";
import { number } from "yup";
import { Loading } from "../Loading/Loading";
export const Visits = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [visit, setVisits] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const tutorialsRef = useRef<Array<any>>([]);

  const [date, setDate] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  tutorialsRef.current = visit;

  const onChangeSearchTitle = (e: any) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const getRequestParams = (
    searchTitle: string,
    page: number,
    pageSize: number,
    date: Date | null
  ) => {
    let params: { [key: string]: any } = {};
    if (date) {
      params["Date"] = moment(date).format("YYYY-MM-DD");
    }
    if (searchTitle) {
      params["Name"] = searchTitle;
    }

    if (page) {
      params["CurrentPage"] = page;
    }

    if (pageSize) {
      params["PageSize"] = pageSize;
    }

    return params;
  };
  const retrieveVisits = (targetPage?: number) => {
    setIsLoading(true);
    const params = getRequestParams(
      searchTitle,
      targetPage != null ? targetPage : page,
      pageSize,
      date
    );
    const queryParams = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    API.get(`api/admin/Visit?${queryParams}`)
      .then((res) => {
        if (res) {
          setVisits(res.data.data);
          setCount(res.data.page.totalCount);
          setTotalPages(Math.ceil(res.data.page.totalCount / pageSize));
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(retrieveVisits, []);

  const handleSearch = () => {
    setPage(1);
    retrieveVisits();
  };

  const handlePageChange = (value: any) => {
    setPage(value);
    retrieveVisits(value);
  };

  const columns: Column[] = useMemo(
    () => [
      {
        Header: "Patient Name",
        accessor: "patientName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "ExamStatus",
        accessor: "examStatus",
      },

      {
        Header: "ExamType",
        accessor: "examType",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: (props: any) => {
          return <div>{moment(props.value).format("YYYY-MM-DD")}</div>;
        },
      },
      {
        Header: "Comment",
        accessor: "comment",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: visit,
    });

  return (
    <div className="grid grid-cols-2 visits">
      {isLoading === true ? (
        <>
          <Loading />
        </>
      ) : null}
      <div className="col-start-1 flex justify-between items-center gap-4 mb-3">
        <input
          type="text"
          className="input"
          placeholder="Search by patient name"
          value={searchTitle}
          onChange={onChangeSearchTitle}
        />

        <input
          type="date"
          className="input"
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        <div>
          <button
            className="border border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white focus:ring-2 focus:ring-gray-300 px-4 py-2 rounded transition"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="col-start-2 flex justify-end mb-3">
        <button
          className="border border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white focus:ring-2 focus:ring-gray-300 px-4 py-2 rounded transition"
          type="button"
          onClick={() => navigate("/Visits/AddVisit")}
        >
          Add New Visit
        </button>
      </div>

      <div className="col-span-full flex w-full overflow-x-auto">
        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8 mt-4">
        <Pagination
          currentPage={page}
          lastPage={totalPages}
          maxLength={5}
          setCurrentPage={handlePageChange}
        />
      </div>
    </div>
  );
};
