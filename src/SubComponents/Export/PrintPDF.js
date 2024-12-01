import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../Assets/Icons/Daginlogo.jpg";
import "./PrintPDF.css";
import pdfIcon from "../../Assets/Icons/PDF-icon.svg";
import moment from "moment";

const PrintPDF = ({ dataToPrint }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `مهمة رقم : ${dataToPrint.id}`,
    onAfterPrint: () => console.log("Printed PDF successfully!"),
  });
  return (
    <>
      <div ref={componentRef} className="pass-content">
        <div className="grid grid-cols-2 p-4">
          <div className="col-span-full">
            <img src={logo} className="logo" />
          </div>
          <div className="col-start-1 flex  items-center gap-2 mt-4">
            <h3 className="Head-label">نوع المهمة:</h3>
            <p className="label-content">
              {dataToPrint.type != null ? dataToPrint.type.name : ""}
            </p>
          </div>
          <div className="col-start-2 flex justify-end items-center gap-2 mt-4">
            <p className="label-content">{dataToPrint.id}</p>
          </div>

          <div className="col-start-1 flex  items-center gap-2 mt-4">
            <h3 className="Head-label">تاريخ انتهاء المهمة:</h3>
            <p className="label-content">
              <p className="label-content">
                {moment(dataToPrint.due_at).format("DD MMMM YYYY")}{" "}
              </p>
            </p>
          </div>

          <div className="col-span-full">
            <div className="divider"></div>
          </div>
          {/* المربي */}
          <div className="col-start-1 flex  items-center gap-2 mt-2">
            <h3 className="Head-label">معلومات المربي</h3>
          </div>
          <div className="col-span-full mt-4">
            <div className="flex w-full overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>الأسم</th>
                    <th>العنوان</th>
                    <th>المحافظة</th>
                  </tr>
                </thead>
                {dataToPrint.breeder != null &&
                dataToPrint.breeder !== undefined ? (
                  <>
                    <tbody>
                      <tr>
                        <th> {dataToPrint.breeder.name}</th>
                        <td>{dataToPrint.breeder.full_address}</td>
                        <td>
                          {dataToPrint.breeder.governorate != null
                            ? dataToPrint.breeder.governorate.name
                            : ""}
                        </td>
                      </tr>
                    </tbody>
                  </>
                ) : null}
              </table>
            </div>
          </div>

          {/* العنبر */}
          <div className="col-start-1 flex  items-center gap-2 mt-8">
            <h3 className="Head-label">معلومات العنبر</h3>
          </div>
          <div className="col-span-full mt-4">
            <div className="flex w-full overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>الأسم</th>
                    <th>العنوان</th>
                    <th>المحافظة</th>
                    <th>المركز</th>
                  </tr>
                </thead>
                {dataToPrint.farm_id != null &&
                dataToPrint.farm_id !== undefined &&
                dataToPrint.farm_id !== "0" ? (
                  <>
                    <tbody>
                      <tr>
                        <th> {dataToPrint.farm.name}</th>
                        <td>{dataToPrint.farm.full_address}</td>
                        <td>
                          {dataToPrint.farm.governorate != null
                            ? dataToPrint.farm.governorate.name
                            : ""}
                        </td>
                        <td>
                          {dataToPrint.farm.city != null
                            ? dataToPrint.farm.city.name
                            : ""}
                        </td>
                      </tr>
                    </tbody>
                  </>
                ) : null}
              </table>
            </div>
          </div>

          {/* معلومات المندوب */}
          <div className="col-start-1 flex  items-center gap-2 mt-8">
            <h3 className="Head-label">معلومات المندوب</h3>
          </div>
          <div className="col-span-full mt-4">
            <div className="flex w-full overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>الأسم</th>
                    <th>رقم التليفون</th>
                    <th>رقم المحفظة</th>
                  </tr>
                </thead>
                {dataToPrint.salesman != null &&
                dataToPrint.salesman !== undefined ? (
                  <>
                    <tbody>
                      <tr>
                        <th> {dataToPrint.salesman.name}</th>
                        <td>{dataToPrint.salesman.mobile_number}</td>
                        <td>{dataToPrint.salesman.ewallet_number}</td>
                      </tr>
                    </tbody>
                  </>
                ) : null}
              </table>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handlePrint}>
        <img src={pdfIcon} className="pdf-icon" />
      </button>
    </>
  );
};

export default PrintPDF;
