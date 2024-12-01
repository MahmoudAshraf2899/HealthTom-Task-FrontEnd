import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../Assets/Icons/Daginlogo.jpg";
import "./PrintPDF.css";
import pdfIcon from "../../Assets/Icons/PDF-icon.svg";
import moment from "moment";

const PrintFarmDetails = ({ dataToPrint, housingData }) => {
  useEffect(() => {}, []);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `عنبر : ${dataToPrint.name}`,
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
            <h3 className="Head-label">أسم العنبر:</h3>
            <p className="label-content">{dataToPrint.name}</p>
          </div>
          <div className="col-start-2 flex justify-end items-center gap-2 mt-4">
            <p className="label-content">{dataToPrint.id}</p>
          </div>

          <div className="col-start-1 flex  items-center gap-2 mt-4">
            <h3 className="Head-label">المحافظة:</h3>
            <p className="label-content">
              <p className="label-content">
                {" "}
                {dataToPrint.governorate != null
                  ? dataToPrint.governorate.name
                  : ""}
              </p>
            </p>
          </div>

          <div className="col-start-2 flex justify-end items-center gap-2 mt-4">
            <h3 className="Head-label">المدينة:</h3>
            <p className="label-content">
              {dataToPrint.city != null ? dataToPrint.city.name : ""}
            </p>
          </div>

          <div className="col-start-1 flex  items-center gap-2 mt-4">
            <h3 className="Head-label">المساحة:</h3>
            <p className="label-content">
              <p className="label-content">{dataToPrint.area} </p>
            </p>
          </div>

          <div className="col-start-2 flex justify-end items-center gap-2 mt-4">
            <h3 className="Head-label">حالة العنبر:</h3>
            <p className="label-content">
              <>
                {dataToPrint.status_id === "1" ? (
                  <>قيد المراجعة</>
                ) : dataToPrint.status_id === "2" ? (
                  <>فارغ</>
                ) : dataToPrint.status_id === "3" ? (
                  <>في التشغيل</>
                ) : dataToPrint.status_id === "4" ? (
                  <>معروض للبيع</>
                ) : dataToPrint.status_id === "5" ? (
                  <>مرفوض</>
                ) : (
                  ""
                )}
              </>
            </p>
          </div>

          <div className="col-start-1 flex  items-center gap-2 mt-4">
            <h3 className="Head-label">سعة العنبر:</h3>
            <p className="label-content">
              <p className="label-content">
                {dataToPrint.capacity != null
                  ? dataToPrint.capacity.capacity
                  : ""}{" "}
              </p>
            </p>
          </div>

          <div className="col-start-2 flex justify-end items-center gap-2 mt-4">
            <h3 className="Head-label">نوع التربية:</h3>

            <p className="label-content">
              {dataToPrint.farmingType != null
                ? dataToPrint.farmingType.type
                : ""}{" "}
            </p>
          </div>

          <div className="col-start-1 flex  items-center gap-2 mt-4">
            <h3 className="Head-label">نوع التهوئة:</h3>

            <p className="label-content">
              {dataToPrint.ventilationType != null
                ? dataToPrint.ventilationType.type
                : ""}{" "}
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
                    <th>رقم الهاتف</th>
                    <th>مربي أعمار</th>
                  </tr>
                </thead>
                {dataToPrint.user != null && dataToPrint.user !== undefined ? (
                  <>
                    <tbody>
                      <tr>
                        <th> {dataToPrint.user.name}</th>
                        <td>{dataToPrint.user.mobile_number}</td>
                        <td>
                          {dataToPrint.user.incubator === 1 ? "نعم" : "لا"}
                        </td>
                      </tr>
                    </tbody>
                  </>
                ) : null}
              </table>
            </div>
          </div>

          {/* دورات التسكين */}
          <div className="col-start-1 flex  items-center gap-2 mt-8">
            <h3 className="Head-label">دورات التسكين</h3>
          </div>
          <div className="col-span-full mt-4">
            <div className="flex w-full overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>التاريخ</th>
                    <th>تاريخ البيع المتوقع</th>
                    <th>نوع الداجن</th>
                    <th>نوع السلالة</th>
                    <th>العدد</th>
                    <th>الشركة</th>
                  </tr>
                </thead>
                {housingData.length > 0 ? (
                  <>
                    <tbody>
                      {housingData.map((item, index) => (
                        <tr key={index}>
                          <th>
                            {moment(item.housing_date).format("YYYY-MM-DD")}
                          </th>
                          <td>
                            {moment(item.expected_sale_date).format(
                              "YYYY-MM-DD"
                            )}
                          </td>
                          <td>
                            {item.dajinBreed != null ? (
                              <>
                                {item.dajinBreed.dajinType != null ? (
                                  <>{item.dajinBreed.dajinType.type}</>
                                ) : (
                                  ""
                                )}
                              </>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            {item.dajinBreed != null ? (
                              <>{item.dajinBreed.breed_type}</>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>{item.count}</td>
                          <td>
                            {item.company != null ? item.company.type : ""}
                          </td>
                        </tr>
                      ))}
                      <tr></tr>
                    </tbody>
                  </>
                ) : null}
              </table>
            </div>
          </div>

          {/* صورة العنبر */}
          <div className="col-start-1 flex  items-center gap-2 mt-8">
            <h3 className="Head-label">صورة العنبر</h3>
          </div>
          <div className="col-span-full mt-4">
            {dataToPrint.photo != null ? (
              <img
                src={dataToPrint.photo}
                className="farm-view"
                alt="farm-view"
              />
            ) : null}
          </div>
        </div>
      </div>
      <button onClick={handlePrint}>
        <img src={pdfIcon} className="pdf-icon" alt="logo-view" />
      </button>
    </>
  );
};

export default PrintFarmDetails;
